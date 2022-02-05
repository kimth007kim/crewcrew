package matchTeam.crewcrew.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.ConfirmationTokenService;
import matchTeam.crewcrew.service.UserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Api(tags={ "2. User"})
@RestController("/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;

    @ApiImplicitParams({
            @ApiImplicitParam(
                    name="X-AUTH-TOKEN",
                    value="로그인 성공후 AccessToken",
                    required= true,dataType = "String",paramType = "header"
            )
    })

    @ApiOperation(value ="모든 회원 조회" ,notes="모든 유저의 정보를 확인한다.")
    @GetMapping("/users")
    public ResponseEntity<Object> findByUserEmail() {
        return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, userService.findUsers());
    }



    @ApiImplicitParams({
            @ApiImplicitParam(
                    name="X-AUTH-TOKEN",
                    value="로그인 성공후 AccessToken",
                    required= true,dataType = "String",paramType = "header"
            )
    })
    @ApiOperation(value ="회원 단건 검색(이메일)" ,notes="유효한 이메일 인지 확인하고 유효하면 보냅니다.")
    @GetMapping("/user/email/{email}")
    public ResponseEntity<Object> findAllUser(
            @ApiParam(value = "회원 email",required =true)@PathVariable String email) {
        Optional<User> user = userService.findByEmail(email);
        return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, user);

    }





    @ApiOperation(value ="이메일 유효 검사 후 이메일 발송" ,notes="유효한 이메일 인지 확인하고 유효하면 보냅니다.")
    @PostMapping("/email")
    public ResponseEntity<Object> SendEmail(String email) {
        //email 주소 형식 에  맞는지 확인하는 메서드
        //이미 가입되었는지 확인하는 메서드
        // 이메일 전송하는메서드
        confirmationTokenService.createEmailConfirmationToken(email);

        return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, null);

    }

//    @ApiOperation(value ="이메일 유효 검사" ,notes="이미 가입된 회원인지? 아니면 유효하지않은 이메일인지 확인합니다.")
//    @GetMapping("confirm-email")
//    public String viewConfirmEmail(@Valid @RequestParam String token) {
//        userService.confirmEmail(token);
//
//        return "redirect:/login";
//    }


}