package matchTeam.crewcrew.service.user;

import lombok.AllArgsConstructor;
import matchTeam.crewcrew.config.RedisUtil;
import matchTeam.crewcrew.response.exception.auth.CEmailCodeNotMatchException;
import matchTeam.crewcrew.response.exception.auth.CNotVerifiedEmailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@AllArgsConstructor
@Service
public class EmailService {
    private final RedisUtil redisUtil;
    private final EmailSenderService emailSenderService;



    public String findPassword(String email,String name){
        Random r = new Random();
        int dice = r.nextInt(157211)+48721;
        String setfrom = "kimth00700kim@google.com";
        String content=System.getProperty("line.separator")+
                System.getProperty("line.separator")+
                "안녕하세요 "+name+"님 저희 홈페이지를 찾아주셔서 감사합니다"
                +System.getProperty("line.separator")+
                System.getProperty("line.separator")+
                "비밀번호 찾기 인증번호는 " +dice+ " 입니다. "
                +System.getProperty("line.separator")+
                System.getProperty("line.separator")+
                "받으신 인증번호를 홈페이지에 입력해 주시면 다음으로 넘어갑니다.";


        SimpleMailMessage mailMessage  = new SimpleMailMessage();
        mailMessage.setFrom(setfrom); // 보내는사람 생략하면 정상작동을 안함
        mailMessage.setTo(email); // 받는사람 이메일
        mailMessage.setSubject("비밀번호 찾기 기능입니다!"); // 메일제목은 생략이 가능하다
        mailMessage.setText(content); // 메일 내용
        emailSenderService.sendEmail(mailMessage);
        StringBuilder sb = new StringBuilder();
        sb.append("passwordFinder_");
        sb.append(email);
        sb.append("_");
        sb.append(dice);
        String verifier= sb.toString();
        emailSenderService.sendEmail(mailMessage);
        String code= Integer.toString(dice);
        redisUtil.setDataExpire(verifier,code,60*3L);
        return code;
    }

    public void sendNewPassword(String email,String password,String name){
        SimpleMailMessage mailMessage  = new SimpleMailMessage();
        mailMessage.setTo(email);
        String setfrom = "kimth00700kim@google.com";
        mailMessage.setSubject("[크루크루] 회원님의 새로운 비밀번호 입니다.");
        String content=System.getProperty("line.separator")+
                System.getProperty("line.separator")+
                "안녕하세요 "+name+"님 저희 홈페이지를 찾아주셔서 감사합니다"
                +System.getProperty("line.separator")+
                System.getProperty("line.separator")+
                "새로 발급되는 비밀번호는 " +password+ " 입니다. "
                +System.getProperty("line.separator")+
                System.getProperty("line.separator")+
                "추후에 홈페이지에서 비밀번호 변경하고 사용하는것을 권장드립니다.";
        mailMessage.setFrom(setfrom); // 보내는사람 생략하면 정상작동을 안함
        mailMessage.setTo(email); // 받는사람 이메일
        mailMessage.setText(content); // 메일 내용
        emailSenderService.sendEmail(mailMessage);
    }

    public String codeForPasswordFinder(String email,String code){
        StringBuilder sb = new StringBuilder();
        sb.append("passwordFinder_");
        sb.append(email);
        sb.append("_");
        sb.append(code);
        String result=redisUtil.getData(sb.toString());
        if (result == null){
            throw new CEmailCodeNotMatchException();
        }
        Random random = new Random();
        int length = random.nextInt(5)+5;

        StringBuffer new_password = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int choice = random.nextInt(3);
            switch(choice) {
                case 0:
                    new_password.append((char)((int)random.nextInt(25)+97));
                    break;
                case 1:
                    new_password.append((char)((int)random.nextInt(25)+65));
                    break;
                case 2:
                    new_password.append((char)((int)random.nextInt(10)+48));
                    break;
                default:
                    break;
            }
        }
        return new_password.toString();
    }



    public String sendVerifyCode(String email){
        String code=createCode();
        SimpleMailMessage mailMessage  = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("크루크루 회원가입 이메일 인증코드입니다.");
        mailMessage.setText("[인증 코드]: "+code);
        StringBuilder sb = new StringBuilder();
        sb.append("code_");
        sb.append(email);
        String verifier= sb.toString();
        emailSenderService.sendEmail(mailMessage);
        redisUtil.setDataExpire(verifier,code,60*3L);
        return code;
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
