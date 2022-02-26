package matchTeam.crewcrew.controller.api.v1.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.social.*;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.user.AccessTokenDto;
import matchTeam.crewcrew.dto.user.LocalSignUpRequestDto;
import matchTeam.crewcrew.dto.user.UserLoginRequestDto;
import matchTeam.crewcrew.dto.user.UserSignUpRequestDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.auth.CNotValidEmailException;
import matchTeam.crewcrew.response.exception.auth.CSocialAgreementException;
import matchTeam.crewcrew.response.exception.auth.CUserAlreadyExistException;
import matchTeam.crewcrew.response.exception.auth.CUserNotFoundException;
import matchTeam.crewcrew.service.user.EmailService;
import matchTeam.crewcrew.service.user.KakaoService;
import matchTeam.crewcrew.service.user.NaverService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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



    @ApiOperation(value ="이메일 인증코드 발송" ,notes="1. 유효한 이메일 인지 확인합니다.\n " +
            "2. 이미 같은 이메일로 가입되어있는지 확인합니다\n" +
            "3. 1,2번 조건을 만족했다면 해당 메일로 인증코드를 보냅니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "인증번호 발송 성공"
                    ,response = String.class
            )
            , @ApiResponse(
            code = 1001
            , message ="이메일 형식이 유효하지않습니다."
            )
            , @ApiResponse(
            code = 1002
            , message ="이미 존재하는 유저입니다."
            )
    })
    @PostMapping("/email/send")
    public ResponseEntity<Object> SendEmail(String email) {
        //email 주소 형식 에  맞는지 확인하는 메서드
        if (emailService.isValidEmailAddress(email)==false){
            throw new CNotValidEmailException();
//            1001 이메일이 유효하지 않다.
        }

        //이미 가입되었는지 확인하는 메서드
        if (userService.findByEmailAndProvider(email, "local").isPresent()){
            throw new CUserAlreadyExistException();
//            1002 이미 존재하는 유저이다.
        }
        // 이메일 전송하는메서드
        String code = emailService.sendEmailMessage(email);

        return ResponseHandler.generateResponse("인증번호 발송 성공", HttpStatus.OK, code);

    }
    @ApiOperation(value ="이메일 인증코드 유효성 검사" ,notes="이메일로 발송한 인증코드와 사용자가 입력한 인증코드가 맞는지 확인합니다.")
    @PostMapping("/email/verify")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "인증번호 인증 성공"
            )
            , @ApiResponse(
            code = 1003
            , message ="발급된 인증 코드가 이메일과 다릅니다."
    )
    })
    public ResponseEntity<Object> CodeVerify(String code,String email) {
        emailService.getUserIdByCode(code,email);
        //1003 발급된 인증 코드가 이메일과 일치하지않는다.
        System.out.println(code);
        return ResponseHandler.generateResponse("인증번호 인증 성공", HttpStatus.OK, null);

    }

    @ApiOperation(value = "이메일 회원가입", notes = "이메일로 회원가입을 합니다.")
    @PostMapping("/signup")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "회원가입 성공"
            )
            , @ApiResponse(
            code = 1004
            , message ="이메일 인증이 되지않은 이메일 주소입니다."
    )
            , @ApiResponse(
            code = 1005
            , message ="현재 입력한 이메일을 가진 유저가 이미 존재합니다. "
    )
    })

    public ResponseEntity<Object> signup(
            @ApiParam(value = "회원 가입 요청", required = true)
            @RequestBody LocalSignUpRequestDto localSignUpRequestDto) {
        emailService.checkVerifiedEmail(localSignUpRequestDto.getEmail());
        //1004 이메일인증이 안된 이메일
        Long signupId = userService.signup(localSignUpRequestDto);
        //1005 현재 입력한 이메일로 이미 존재할 경우
        return ResponseHandler.generateResponse("회원가입 성공", HttpStatus.OK, signupId);
    }

    @ApiOperation(value = "이메일 로그인", notes = "이메일로 로그인")
    @PostMapping("/login")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "회원가입 성공"
                    ,response = TokenDto.class
            )
            , @ApiResponse(
            code = 1101
            , message ="존재하지 않는 이메일 입니다."
    )
            , @ApiResponse(
            code = 1102
            , message ="비밀번호가 이메일과 일치하지않습니다."
    )
    })
    public ResponseEntity<Object> login(
            @ApiParam(value = "로그인 요청 DTO", required = true) @RequestBody UserLoginRequestDto userLoginRequestDto) throws JsonProcessingException {


        TokenDto tokenDto = userService.login(userLoginRequestDto);

        return ResponseHandler.generateResponse("로그인 성공", HttpStatus.OK, new AccessTokenDto(tokenDto.getAccessToken()));

    }


    @PostMapping("/token/isvalid")
    public ResponseEntity<?> validToken(String refreshToken) {
        boolean isValid = jwtProvider.validateToken(refreshToken);
        return ResponseHandler.generateResponse("토큰 유효 확인 성공", HttpStatus.OK,isValid );
    }

    @PostMapping("/cookie")
    public ResponseEntity<Object> cookie(HttpServletRequest req, HttpServletResponse response, @RequestBody UserLoginRequestDto userLoginRequestDto) {
        response.setHeader("Set-Cookie", "sadasd");


        HttpCookie cookie = ResponseCookie.from("heroku-nav-data"," aaa")
                .path("/")
                .build();
//        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseHandler.generateResponse("로그인 성공", HttpStatus.OK, cookie);
    }

    @ApiOperation(value = "엑세스,리프레시 토큰 재발급"
            , notes = "엑세스 리프레시 토큰 만료시 회원 검증 후 리프레시 토큰을 검증해서 엑세스 토큰과 리프레시 토큰을 재발급한다.")
    @PostMapping("/reissue")
    public ResponseEntity<Object> check(
            @ApiParam(value = "토큰 재발급 요청 DTO", required = true)
            @RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, userService.reissue(tokenRequestDto).getAccessToken());
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


        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, jwtProvider.createTokenDto(user.getUid(),user.getRoles(),false));
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

        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, jwtProvider.createTokenDto(user.getUid(),user.getRoles(),false));
    }




}