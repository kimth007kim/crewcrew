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
        emailSenderService.sendEmail(mailMessage);
        redisUtil.setDataExpire(code,email,60*5L);
        return code;
    }

    public void getUserIdByCode(String code){
        String email=redisUtil.getData(code);
        if (email == null){
            throw new CEmailCodeNotMatchException();
        }
        redisUtil.setDataExpire(email,"true",60*30L);
    }

    public void checkCode(String email){
        String check=redisUtil.getData(email);
        if (check == null){
            throw new CNotVerifiedEmailException();
        }
    }

    private String createCode(){
        Random random= new Random();
        int length=12;
        String code = random
                .ints(48,58)
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
