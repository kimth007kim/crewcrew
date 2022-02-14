package matchTeam.crewcrew.controller.api.v1.user;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.social.*;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.user.LocalSignUpRequestDto;
import matchTeam.crewcrew.dto.user.UserLoginRequestDto;
import matchTeam.crewcrew.dto.user.UserSignUpRequestDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.CNotValidEmailException;
import matchTeam.crewcrew.response.exception.CSocialAgreementException;
import matchTeam.crewcrew.response.exception.CUserAlreadyExistException;
import matchTeam.crewcrew.response.exception.CUserNotFoundException;
import matchTeam.crewcrew.service.user.EmailService;
import matchTeam.crewcrew.service.user.KakaoService;
import matchTeam.crewcrew.service.user.NaverService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(tags = "1. Auth")
@RequiredArgsConstructor
@RestController
//@RequestMapping("/api/v1/auth/")
@RequestMapping("/auth")
public class AuthController {


    private final UserService userService;
    private final EmailService emailService;
    private final KakaoService kakaoService;
    private final NaverService naverService;
    private final JwtProvider jwtProvider;

    @ApiOperation(value = "이메일 로그인", notes = "이메일로 로그인")
    @PostMapping("/login")
    public ResponseEntity<Object> login(
            @ApiParam(value = "로그인 요청 DTO", required = true) @RequestBody UserLoginRequestDto userLoginRequestDto) {

        TokenDto tokenDto = userService.login(userLoginRequestDto);
        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, tokenDto);

    }


    @ApiOperation(value = "이메일 회원가입", notes = "이메일로 회원가입을 합니다.")
    @PostMapping("/signup")
    public ResponseEntity<Object> signup(
            @ApiParam(value = "회원 가입 요청", required = true)
            @RequestBody LocalSignUpRequestDto localSignUpRequestDto) {
        emailService.checkVerifiedEmail(localSignUpRequestDto.getEmail());
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





    @ApiOperation(value = "카카오 토큰 정보확인"
            , notes = "카카오에서 받아온 인가 코드로 유저 정보를 확인합니다.")
    @GetMapping("/kakao/token/{accessToken}")
    public ResponseEntity<Object> tokenCheckKakao(
            @ApiParam(value = "카카오에서 받은 Access 토큰", required = true)
            @RequestParam String accessToken) {
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(accessToken);
        if (kakaoProfile == null) throw new CUserNotFoundException();

        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, kakaoProfile);
    }
    @ApiOperation(value = "네이버 토큰 정보확인"
            , notes = "네이버에서 받아온 인가 코드로 유저 정보를 확인합니다.")
    @GetMapping("/naver/token/{accessToken}")
    public ResponseEntity<Object> tokenCheckNaver(
            @ApiParam(value = "네이버에서 받은 Access 토큰", required = true)
            @RequestParam String accessToken) {
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(accessToken);
        if (kakaoProfile == null) throw new CUserNotFoundException();

        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, kakaoProfile);
    }





    @ApiOperation(value = "카카오 소셜 회원가입"
            , notes = "카카오로 회원가입을 합니다.")
    @PostMapping("/kakao/signup")
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

    @ApiOperation(value = "카카오 소셜 로그인"
            , notes = "카카오로 소셜 로그인을 합니다.")
    @PostMapping("/kakao/login")
    public ResponseEntity<Object> loginByKakao(
            @ApiParam(value = "소셜 카카오 로그인 dto", required = true)
            @RequestBody KakaoLoginRequestDto kakaoLoginRequestDto) {
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(kakaoLoginRequestDto.getAccessToken());
        System.out.println("카카오 프로필"+kakaoProfile);
        if (kakaoProfile == null) throw new CUserNotFoundException();

        User user = userService.findByEmailAndProvider(kakaoProfile.getKakao_account().getEmail(),"kakao").orElseThrow(CUserNotFoundException::new);


        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, jwtProvider.createTokenDto(user.getUid(),user.getRoles()));
    }

    @ApiOperation(value = "네이버 소셜 회원가입"
            , notes = "네이버 소셜 회원가입을 합니다.")
    @PostMapping("/naver/signup")
    public ResponseEntity<Object> signupByNaver(
            @ApiParam(value = "소셜 네이버 회원가입 dto", required = true)
            @RequestBody NaverSignupRequestDto naverSignupRequestDto) {
        NaverProfile naverProfile = naverService.getNaverProfile(naverSignupRequestDto.getAccessToken());
        if (naverProfile == null) throw new CUserNotFoundException();
//        if (kakaoProfile.getKakao_account().getEmail()==null){
//            kakaoService.kakaoUnlink(naverSignupRequestDto.getAccessToken());
//            throw new CSocialAgreementException();
//        }
        Long userId = userService.naverSignup(UserSignUpRequestDto.builder()
                .email(naverProfile.getResponse().getEmail())
                .name(naverProfile.getResponse().getName())
                .nickName(naverProfile.getResponse().getName())
                .provider("naver")
                .build());
        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, userId);
    }

    @ApiOperation(value = "네이버 소셜 로그인"
            , notes = "네이버로 소셜 로그인을 합니다.")
    @PostMapping("/naver/login")
    public ResponseEntity<Object> loginByNaver(
            @ApiParam(value = "소셜 네이버 로그인 dto", required = true)
            @RequestBody NaverLoginRequestDto naverLoginRequestDto) {
        NaverProfile naverProfile = naverService.getNaverProfile(naverLoginRequestDto.getAccessToken());
        if (naverProfile == null) throw new CUserNotFoundException();

        User user = userService.findByEmailAndProvider(naverProfile.getResponse().getEmail(),"naver").orElseThrow(CUserNotFoundException::new);

        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, jwtProvider.createTokenDto(user.getUid(),user.getRoles()));
    }


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
    public ResponseEntity<Object> CodeVerify(String code,String email) {
        emailService.getUserIdByCode(code,email);
        System.out.println(code);
        return ResponseHandler.generateResponse("인증번호 인증 성공", HttpStatus.OK, null);

    }


}
