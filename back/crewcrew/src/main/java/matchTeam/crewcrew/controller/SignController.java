package matchTeam.crewcrew.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.KakaoLoginRequestDto;
import matchTeam.crewcrew.dto.security.KakaoSignupRequestDto;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.social.KakaoProfile;
import matchTeam.crewcrew.dto.user.LocalSignUpRequestDto;
import matchTeam.crewcrew.dto.user.UserLoginRequestDto;
import matchTeam.crewcrew.dto.user.UserSignUpRequestDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.CSocialAgreementException;
import matchTeam.crewcrew.response.exception.CUserNotFoundException;
import matchTeam.crewcrew.service.KakaoService;
import matchTeam.crewcrew.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Api(tags = "1.SignUp/Login")
@RequiredArgsConstructor
@RestController
@RequestMapping("/sign")
public class SignController {

    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final KakaoService kakaoService;
    private final PasswordEncoder passwordEncoder;

    @ApiOperation(value = "로그인", notes = "이메일로 로그인")
    @PostMapping("/login")
    public ResponseEntity<Object> login(
            @ApiParam(value = "로그인 요청 DTO", required = true) @RequestBody UserLoginRequestDto userLoginRequestDto) {

        TokenDto tokenDto = userService.login(userLoginRequestDto);
        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, tokenDto);

    }


    @ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
    @PostMapping("/signup")
    public ResponseEntity<Object> signup(
            @ApiParam(value = "회원 가입 요청", required = true)
            @RequestBody LocalSignUpRequestDto localSignUpRequestDto) {
        Long signupId = userService.signup(localSignUpRequestDto);
        return ResponseHandler.generateResponse("Sign up Success", HttpStatus.OK, signupId);
    }

    @ApiOperation(value = "엑세스,리프레시 토큰 재발급"
            , notes = "엑세스 리프레시 토큰 만료시 회원 검증 후 리프레시 토큰을 검증해서 엑세스 토큰과 리프레시 토큰을 재발급한다.")
    @PostMapping("/reissue")
    public ResponseEntity<Object> check(
            @ApiParam(value = "토큰 재발급 요청 DTO", required = true)
            @RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, userService.reissue(tokenRequestDto));
    }



    @ApiOperation(value = "소셜 로그인 - kakao"
            , notes = "카카오로 로그인을 합니다.")
    @PostMapping("/social/login/kakao")
    public ResponseEntity<Object> loginByKakao(
            @ApiParam(value = "소셜 카카오 로그인 dto", required = true)
            @RequestBody KakaoLoginRequestDto kakaoLoginRequestDto) {
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(kakaoLoginRequestDto.getAccessToken());
        if (kakaoProfile == null) throw new CUserNotFoundException();

        User user = userService.findByEmailAndProvider(kakaoProfile.getKakao_account().getEmail(),"kakao").orElseThrow(CUserNotFoundException::new);


        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, jwtProvider.createTokenDto(user.getUid(),user.getRoles()));
    }



    @ApiOperation(value = "소셜 회원가입 - kakao"
            , notes = "카카오로 회원가입을 합니다.")
    @PostMapping("/social/signup/kakao")
    public ResponseEntity<Object> signupByKakao(
            @ApiParam(value = "소셜 카카오 회원가입 dto", required = true)
            @RequestBody KakaoSignupRequestDto kakaoSignupRequestDto) {
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(kakaoSignupRequestDto.getAccessToken());
        if (kakaoProfile == null) throw new CUserNotFoundException();
        if (kakaoProfile.getKakao_account().getEmail()==null){
            kakaoService.kakaoUnlink(kakaoSignupRequestDto.getAccessToken());
            throw new CSocialAgreementException();
        }
        Long userId = userService.kakaoSignup(UserSignUpRequestDto.builder()
                .email(kakaoProfile.getKakao_account().getEmail())
                .name(kakaoProfile.getProperties().getNickname())
                .nickName(kakaoProfile.getProperties().getNickname())
                .provider("kakao")
                .build());
        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, userId);
    }



}
