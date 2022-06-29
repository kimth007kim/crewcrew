package matchTeam.crewcrew;

import matchTeam.crewcrew.dto.security.ResponseTokenDto;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.user.UserLoginRequestDto;
import matchTeam.crewcrew.service.user.EmailService;
import matchTeam.crewcrew.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@SpringBootTest
public class AuthTest {

    @Autowired
    UserService userService;
    @Autowired
    EmailService emailService;
    @Test
    public void 로그인_중복() throws Exception{
        UserLoginRequestDto request = new UserLoginRequestDto("kimth007kim@naver.com","a12345678!",false);
//        Optional<User> id = userService.findByEmailAndProvider("kimth007kim@naver.com","local");
//        System.out.println(id.get());
        ResponseTokenDto tokendto  = userService.login(request);
        ResponseTokenDto tokendto1  = userService.login(request);
        ResponseTokenDto tokendto2  = userService.login(request);
        ResponseTokenDto tokendto3  = userService.login(request);



    }
    @Test
//    @Transactional
    public void 회원가입후_제거_테스트() throws Exception{


        String email ="rlarudehd12@daum.net";
        String password= "a123456789!";
        String name="kim";
        String nickName="kimsacsacs";
        MultipartFile file = null;
        ArrayList<Long> categoryId = new ArrayList<>(Arrays.asList(7L,14L));
        String message = "안녕하세요";
        Integer Default= 1;

        String code = emailService.sendVerifyCode(email);
        emailService.getUserIdByCode(code, email);
        ResponseTokenDto responseTokenDto= userService.register(email,password,name,nickName,file,  categoryId,message,Default);

//        System.out.println()


    }

}
