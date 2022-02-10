package matchTeam.crewcrew.controller.user;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.CNotValidEmailException;
import matchTeam.crewcrew.response.exception.CUserAlreadyExistException;
import matchTeam.crewcrew.service.user.EmailService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Api(tags = "5. /email")
@RequiredArgsConstructor
@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;
    private final UserService userService;


    @ApiOperation(value ="이메일 인증코드 발송" ,notes="1. 유효한 이메일 인지 확인합니다.\n " +
            "2. 이미 같은 이메일로 가입되어있는지 확인합니다\n" +
            "3. 1,2번 조건을 만족했다면 해당 메일로 인증코드를 보냅니다.")
    @PostMapping("/send")
    public ResponseEntity<Object> SendEmail(String email) {
        //email 주소 형식 에  맞는지 확인하는 메서드
        if (emailService.isValidEmailAddress(email)==false){
            throw new CNotValidEmailException();
        }

        //이미 가입되었는지 확인하는 메서드
        if (userService.findByEmailAndProvider(email, "local").isPresent()){
            throw new CUserAlreadyExistException();
        }
        // 이메일 전송하는메서드
        String code = emailService.sendEmailMessage(email);

        return ResponseHandler.generateResponse("인증번호 발송 성공", HttpStatus.OK, code);

    }
    @ApiOperation(value ="이메일 인증코드 유효성 검사" ,notes="이메일로 발송한 인증코드와 사용자가 입력한 인증코드가 맞는지 확인합니다.")
    @PostMapping("/verify")
    public ResponseEntity<Object> CodeVerify(String code) {
        emailService.getUserIdByCode(code);
        System.out.println(code);
        return ResponseHandler.generateResponse("인증번호 인증 성공", HttpStatus.OK, null);

    }
}
