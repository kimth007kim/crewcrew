package matchTeam.crewcrew.service.user;

import lombok.AllArgsConstructor;
import matchTeam.crewcrew.config.RedisUtil;
import matchTeam.crewcrew.response.exception.CEmailCodeNotMatchException;
import matchTeam.crewcrew.response.exception.CNotVerifiedEmailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.util.Random;

@AllArgsConstructor
@Service
public class EmailService {
    private final RedisUtil redisUtil;
    private final EmailSenderService emailSenderService;

    public String sendEmailMessage(String email){

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
        String check=redisUtil.getData(email);
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
