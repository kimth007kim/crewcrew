package matchTeam.crewcrew.service.user;

import lombok.AllArgsConstructor;
import matchTeam.crewcrew.config.RedisUtil;
import matchTeam.crewcrew.response.exception.auth.CEmailCodeNotMatchException;
import matchTeam.crewcrew.response.exception.auth.CNotVerifiedEmailException;
import matchTeam.crewcrew.service.mail.TotalEmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Random;

@AllArgsConstructor
@Service
public class EmailService {
    private final RedisUtil redisUtil;
    private final EmailSenderService emailSenderService;
    private JavaMailSender javaMailSender;
    private TemplateEngine templateEngine;

    private final TotalEmailService totalEmailService;

    public String findPassword(String email, String name) throws MessagingException, IOException {
        Random r = new Random();
        int dice = r.nextInt(157211)+48721;
        String code= Integer.toString(dice);

        //thymeleaf Context에 변수세팅
        Context context = new Context();
        context.setVariable("nickname", name);
        context.setVariable("code", code);

        totalEmailService.sendJavaMail("[크루크루] 이메일 인증 코드 발송", email, "mailform/passwordcheck1", context);

        StringBuilder sb = new StringBuilder();
        sb.append("passwordFinder_");
        sb.append(email);
        String verifier= sb.toString();

        // 3시간 후 만료
        redisUtil.setDataExpire(verifier,code,60*10L);

        return code;
    }

    public void sendNewPassword(String email,String password,String name) throws MessagingException, IOException {

        //thymeleaf Context에 변수세팅
        Context context = new Context();
        context.setVariable("nickname", name);
        context.setVariable("password", password);

        totalEmailService.sendJavaMail("[크루크루] 회원님의 새로운 비밀번호", email, "mailform/passwordcheck2", context);
    }

    public void codeForPasswordFinder(String email,String code){
        StringBuilder sb = new StringBuilder();
        sb.append("passwordFinder_");
        sb.append(email);
        String result=redisUtil.getData(sb.toString());
        if (result == null){
            throw new CEmailCodeNotMatchException();
        }
        if (!result.equals(code)){
            throw new CEmailCodeNotMatchException();
        }
    }

//    public boolean codeForPasswordCheck(String email,String code){
//        StringBuilder sb = new StringBuilder();
//        sb.append("passwordFinder_");
//        sb.append(email);
//        String result=redisUtil.getData(sb.toString());
//        if (result == null || !result.equals(code)) {
//            return false;
//        }
//        return true;
//    }

    public String sendVerifyCode(String email) throws MessagingException {
        String code=createCode();

        Context context = new Context();
        context.setVariable("code", code);

        totalEmailService.sendJavaMail("[크루크루] 회원가입 이메일 인증코드", email, "mailform/SignSerti", context);

        StringBuilder sb = new StringBuilder();
        sb.append("code_");
        sb.append(email);
        String verifier= sb.toString();

        redisUtil.setDataExpire(verifier,code,60*3L);
        return code;
    }

    public void sendWhenApply(String email, String applicantName, String introduce, String study, String hobby, String profileURL) throws MessagingException, IOException {
        // profiledto가 있다면 더 간결하게도 표현이 가능할듯?

        //thymeleaf Context에 변수세팅
        Context context = new Context();
        context.setVariable("nickname", applicantName);
        context.setVariable("introduce", introduce);
        context.setVariable("study", study);
        context.setVariable("hobby", hobby);
        context.setVariable("url", profileURL);
        //th:href="@{/profile(id=${applicantID})}" 와 같은 방식으로 변수 세팅해줄수도 있음, 일단 url 매핑

        totalEmailService.sendJavaMail("[크루크루] 새로운 지원자가 있습니다", email, "mailform/apply", context);
    }

    public void sendWhenAccepted(String email, String name, String chatURL) throws MessagingException, IOException {

        //thymeleaf Context에 변수세팅
        Context context = new Context();
        context.setVariable("nickname", name);
        context.setVariable("chatURL", chatURL);

        totalEmailService.sendJavaMail("[크루크루] 회원님의 요청이 수락되었습니다", email, "mailform/accepted", context);
    }


    public void getUserIdByCode(String code,String email){
        StringBuilder sb = new StringBuilder();
        sb.append("code_");
        sb.append(email);
        System.out.println(sb);
        String result=redisUtil.getData(sb.toString());
        if (result == null){
            throw new CEmailCodeNotMatchException();
        }
        if (!result.equals(code)){
            throw new CEmailCodeNotMatchException();
        }
        redisUtil.setDataExpire(email,"true",60*30L);
    }

    public void checkVerifiedEmail(String email){
        System.out.println("+_+_+_++_+_+++_+_+_+_+_+_++_+_+_++_+_+++_+_+_+_+_+_++_+_+_++_+_+++_+_+_+_+_+_+"+email);
        String check=redisUtil.getData(email);
        System.out.println("+_+_+_++_+_+++_+_+_+_+_+_++_+_+_++_+_+++_+_+_+_+_+_++_+_+_++_+_+++_+_+_+_+_+_+"+check);
        if (check == null){
            throw new CNotVerifiedEmailException();
        }
    }

    private String createCode(){
        // 아예 영어로 바꾸고 길이를 줄이자! 원래 12자 에 all 숫자
        Random random= new Random();
        int length=6;
        String code = random
                .ints(65,91)
                .limit(length)
                .collect(StringBuilder::new,StringBuilder::appendCodePoint,StringBuilder::append)
                .toString();
        return code;
    }

    public static boolean isValidEmailAddress(String email){
        boolean result = true;
        try{
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
        }catch(AddressException ex){
            result = false;
        }
        return result;
    }
}