package matchTeam.crewcrew.controller.api.v1.user;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.social.NaverProfile;
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


    private final LikedCategoryService likedCategoryService;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @ApiImplicitParams({
            @ApiImplicitParam(
                    name="X-AUTH-TOKEN",
                    value="로그인 성공후 AccessToken",
                    required= true,dataType = "String",paramType = "header"
            )
    })

    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "모든 회원 조회 성공"
                    , response = List.class
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
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "회원 단건 검색 성공"
                    , response = UserResponseDto.class
            )
            , @ApiResponse(
            code = 1101
            , message = "존재하지 않는 이메일 입니다."
            )
    })
    @GetMapping("/user/email/{email}")
    public ResponseEntity<Object> findAllUser(
            @ApiParam(value = "회원 email",required =true)@PathVariable String email) {
        User user= userService.findByEmail(email).orElseThrow(LoginFailedByEmailNotExistException::new);
        List<Long> liked =likedCategoryService.findUsersLike(user);
        UserResponseDto userResponseDto = new UserResponseDto(user.getUid(), user.getEmail(),user.getName(),user.getNickname(),user.getProfileImage(),liked,user.getMessage(),user.getProvider());
        return ResponseHandler.generateResponse("회원 단건 검색 성공", HttpStatus.OK, userResponseDto);

    }
    @ApiImplicitParams({
            @ApiImplicitParam(
                    name="X-AUTH-TOKEN",
                    value="로그인 성공후 AccessToken",
                    required= true,dataType = "String",paramType = "header"
            )
    })
    @ApiResponses({

            @ApiResponse(
                    code = 200
                    , message = "엑세스토큰 으로 유저 정보 조회 성공"
                    , response = UserResponseDto.class
            )
            ,@ApiResponse(
            code = 1900
            , message = "입력받은 엑세스토큰에 해당하는 유저가없습니다"
    )

    })
    @ApiOperation(value ="엑세스토큰 으로 유저 정보 조회." ,notes="엑세스 토큰으로 유저정보를 조회합니다.\n"+ "※주의: kakao,naver에서 받은 인가코드로는 불가능합니다.\n"+" 카카오와 네이버에서 인가코드를 받고 로그인후 받은 Access Token는 가능합니다.")
    @GetMapping("/user/token")
    public ResponseEntity<Object> checkToken(@RequestHeader("X-AUTH-TOKEN") String token) {

        System.out.println("X-AUTH-TOKEN"+token);
        User user = userService.tokenChecker(token);
        System.out.println(user.getUid());
        List<Long> liked =likedCategoryService.findUsersLike(user);
        System.out.println("=================================================="+liked.toString());
        UserResponseDto userResponseDto = new UserResponseDto(user.getUid(), user.getEmail(),user.getName(),user.getNickname(),user.getProfileImage(),liked,user.getMessage(),user.getProvider());
        return ResponseHandler.generateResponse("엑세스토큰 으로 유저 정보 조회 성공", HttpStatus.OK,userResponseDto );

    }






}