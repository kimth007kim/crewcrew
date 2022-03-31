package matchTeam.crewcrew.controller.api.v1.user;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.user.example.UserResponseDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.auth.CUserNotFoundException;
import matchTeam.crewcrew.response.exception.auth.LoginFailedByEmailNotExistException;
import matchTeam.crewcrew.service.user.LikedCategoryService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(tags={ "2. User"})
@RestController("/v1")
@RequiredArgsConstructor
public class UserController {

//    @Value("${spring.jwt.secret}")
//    private String secretKey;
    private final LikedCategoryService likedCategoryService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
//    private final ConfirmationTokenService confirmationTokenService;

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
        return ResponseHandler.generateResponse("모든 회원 조회 성공", HttpStatus.OK, userService.findUsers());
    }

    @ApiImplicitParams({
            @ApiImplicitParam(
                    name="X-AUTH-TOKEN",
                    value="로그인 성공후 AccessToken",
                    required= true,dataType = "String",paramType = "header"
            )
    })

    @ApiOperation(value ="회원 단건 검색(이메일)" ,notes="이메일로 유저를 검색합니다.")
    @GetMapping("/user/email/{email}")
    public ResponseEntity<Object> findAllUser(
            @ApiParam(value = "회원 email",required =true)@PathVariable String email) {
        User user= userService.findByEmail(email).orElseThrow(LoginFailedByEmailNotExistException::new);
        List<Long> liked =likedCategoryService.findUsersLike(user);
        UserResponseDto userResponseDto = new UserResponseDto(user.getUid(), user.getEmail(),user.getName(),user.getNickname(),user.getProfileImage(),liked,user.getMessage());
        return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, userResponseDto);

    }
    @ApiImplicitParams({
            @ApiImplicitParam(
                    name="X-AUTH-TOKEN",
                    value="로그인 성공후 AccessToken",
                    required= true,dataType = "String",paramType = "header"
            )
    })

    @ApiOperation(value ="엑세스토큰 으로 유저 정보 조회." ,notes="엑세스 토큰으로 유저정보를 조회합니다.\n"+ "※주의: kakao,naver에서 받은 인가코드로는 불가능합니다.\n"+" 카카오와 네이버에서 인가코드를 받고 로그인후 받은 Access Token는 가능합니다.")
    @GetMapping("/user/token/{accessToken}")
    public ResponseEntity<Object> checkToken(@ApiParam(value = "access 토큰",required =true)  @PathVariable String accessToken) {
        User user = userService.tokenChecker(accessToken);
        List<Long> liked =likedCategoryService.findUsersLike(user);
        System.out.println("=================================================="+liked.toString());
        UserResponseDto userResponseDto = new UserResponseDto(user.getUid(), user.getEmail(),user.getName(),user.getNickname(),user.getProfileImage(),liked,user.getMessage());
        return ResponseHandler.generateResponse("", HttpStatus.OK,userResponseDto );

    }






}