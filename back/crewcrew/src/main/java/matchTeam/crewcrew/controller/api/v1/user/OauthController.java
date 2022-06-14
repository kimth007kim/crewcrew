package matchTeam.crewcrew.controller.api.v1.user;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.ResponseTokenDto;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.social.*;
import matchTeam.crewcrew.dto.user.UserSignUpRequestDto;
import matchTeam.crewcrew.dto.user.example.OauthRedirectDto;
import matchTeam.crewcrew.dto.user.example.OauthUrlResponseDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.response.exception.auth.CSocialAgreementException;
import matchTeam.crewcrew.service.amazonS3.S3Uploader;
import matchTeam.crewcrew.service.user.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Api(tags = " 3. Oauth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OauthController {

    private final RestTemplate restTemplate;
    private final S3Uploader s3Uploader;
    private final Environment env;
    private final KakaoService kakaoService;
    private final UserService userService;
    private final NaverService naverService;
    private final CookieService cookieService;
    private final JwtProvider jwtProvider;
    private final LikedCategoryService likedCategoryService;

    @Value("${url.base}")
    private String baseUrl;

    @Value("${social.kakao.client-id}")
    private String kakaoClientId;

    @Value("${social.kakao.redirect}")
    private String kakaoRedirectUri;

    @Value("${social.naver.client-id}")
    private String naverClientId;

    @Value("${social.naver.redirect}")
    private String naverRedirectUri;


    @ApiOperation(value = "카카오,네이버 소셜로그인 url 호출", notes = "카카오와 네이버")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "url 호출 성공"
                    , response = OauthUrlResponseDto.class
            )
    })
    @GetMapping("/url")
    public ResponseEntity<Object> showUrl() {
        StringBuilder kakaoLoginUri = new StringBuilder()
                .append(env.getProperty("social.kakao.url.login"))
                .append("?response_type=code")
                .append("&client_id=").append(kakaoClientId)
                .append("&redirect_uri=").append(baseUrl).append(kakaoRedirectUri);
        String kakao = kakaoLoginUri.toString();

        StringBuilder naverLoginUri = new StringBuilder()
                .append(env.getProperty("social.naver.url.login"))
                .append("?response_type=code")
                .append("&state=STATE_STRING")
                .append("&client_id=").append(naverClientId)
                .append("&redirect_uri=").append(baseUrl).append(naverRedirectUri);
        String naver = naverLoginUri.toString();
        OauthUrlResponseDto oauthUrlResponseDto = new OauthUrlResponseDto(kakao, naver);
        return ResponseHandler.generateResponse("url 호출 성공", HttpStatus.OK, oauthUrlResponseDto);
    }

    @ApiOperation(value = "카카오 redirect url", notes = "유저가 카카오 로그인을 한 이후에 네이버에서 발급받은 인증 코드(Acess Token)를 크루크루에  리턴 해줍니다.")
    @PostMapping(value = "/kakao/redirect")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "Kakao에서 발행한 AccessToken 발급 성공"
                    , response = OauthRedirectDto.class
            )
            , @ApiResponse(
            code = 1300
            , message = "카카오와 http통신이 실패하였습니다."
    )
            , @ApiResponse(
            code = 1302
            , message = "카카오 유저가 아닙니다."
    )
    })
    public ResponseEntity<Object> redirectKakao(@ApiParam(value = "Authorization Code", required = true)
                                                @RequestParam String code, HttpServletResponse response) {
        RetKakaoOAuth kakaoResult = kakaoService.getKakaoTokenInfo(code);
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(kakaoResult.getAccess_token());
        if (kakaoProfile == null) throw new CrewException(ErrorCode.KAKAO_NOT_EXIST);
        Optional<User> user = userService.findByEmailAndProvider(kakaoProfile.getKakao_account().getEmail(), "kakao");
        if (kakaoProfile.getKakao_account().getEmail() == null) {
            kakaoService.kakaoUnlink(kakaoResult.getAccess_token());
            throw new CSocialAgreementException();
        }
        if (user.isPresent()) {
            ResponseTokenDto token = jwtProvider.createResponseToken(user.get().getUid(), user.get().getRoles(), true);
            cookieService.responseCookie(response, token);
            return ResponseHandler.generateResponse("카카오 로그인 성공", HttpStatus.OK, null);


        } else {
            User new_user = userService.kakaoRegister(kakaoProfile);

            ResponseTokenDto token = jwtProvider.createResponseToken(new_user.getUid(), new_user.getRoles(), true);
            cookieService.responseCookie(response, token);


            return ResponseHandler.generateResponse("카카오 회원가입 성공", HttpStatus.OK, null);

        }

    }

    @ApiOperation(value = "네이버 redirect url", notes = "유저가 네이버 로그인을 한 이후에 네이버에서 발급받은 인증 코드(Acess Token)를 크루크루에  리턴 해줍니다.")
    @PostMapping(value = "/naver/redirect")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "Naver에서 발행한 AccessToken 발급 성공"
                    , response = OauthRedirectDto.class
            )
            , @ApiResponse(
            code = 1400
            , message = "네이버와 http통신이 실패하였습니다."
    )
            , @ApiResponse(
            code = 1402
            , message = "네이버 유저가 아닙니다."
    )
    })

    public ResponseEntity<Object> redirectNaver(@ApiParam(value = "Authorization Code", required = true)
                                                @RequestParam String code, HttpServletResponse response) {
        RetNaverOAuth naverResult = naverService.getNaverTokenInfo(code);
        NaverProfile naverProfile = naverService.getNaverProfile(naverResult.getAccess_token());
        if (naverProfile == null) throw new CrewException(ErrorCode.NAVER_NOT_EXIST);
        Optional<User> user = userService.findByEmailAndProvider(naverProfile.getResponse().getEmail(), "naver");
        if (user.isPresent()) {
            ResponseTokenDto token = jwtProvider.createResponseToken(user.get().getUid(), user.get().getRoles(), true);
            cookieService.responseCookie(response, token);

            return ResponseHandler.generateResponse("네이버 로그인 성공", HttpStatus.OK, null);
        } else {
            User new_user = userService.naverRegister(naverProfile);

            ResponseTokenDto token = jwtProvider.createResponseToken(new_user.getUid(), new_user.getRoles(), true);
            cookieService.responseCookie(response, token);

            return ResponseHandler.generateResponse("네이버 회원가입 성공", HttpStatus.OK, null);

        }


    }

    @GetMapping("/kakao/token/{accessToken}")
    @ApiOperation(value = "카카오 토큰 정보확인"
            , notes = "카카오에서 받아온 인가 코드로 유저 정보를 확인합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "카카오 에서 받은 AcessToken 확인 성공"
                    , response = KakaoProfile.class
            )
            , @ApiResponse(
            code = 1300
            , message = "카카오와 http통신이 실패하였습니다."
    )
            , @ApiResponse(
            code = 1302
            , message = "카카오 유저가 아닙니다."
    )
    })


    public ResponseEntity<Object> tokenCheckKakao(
            @ApiParam(value = "카카오에서 받은 Access 토큰", required = true)
            @RequestParam String accessToken) {
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(accessToken);
        if (kakaoProfile == null) throw new CrewException(ErrorCode.KAKAO_NOT_EXIST);

        return ResponseHandler.generateResponse("카카오 에서 받은 AcessToken 확인 성공", HttpStatus.OK, kakaoProfile);
    }


    @ApiOperation(value = "네이버 토큰 정보확인"
            , notes = "네이버에서 받아온 인가 코드로 유저 정보를 확인합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "Naver에서 발행한 AccessToken 발급 성공"
                    , response = NaverProfile.class
            )
            , @ApiResponse(
            code = 1400
            , message = "네이버와 http통신이 실패하였습니다."
    )
            , @ApiResponse(
            code = 1402
            , message = "네이버 유저가 아닙니다."
    )
    })
    @GetMapping("/naver/token/{accessToken}")
    public ResponseEntity<Object> tokenCheckNaver(
            @ApiParam(value = "네이버에서 받은 Access 토큰", required = true)
            @RequestParam String accessToken) {
        NaverProfile naverProfile = naverService.getNaverProfile(accessToken);
        if (naverProfile == null) throw new CrewException(ErrorCode.PK_USER_NOT_FOUND);

        return ResponseHandler.generateResponse("네이버 에서 받은 AcessToken 확인 성공", HttpStatus.OK, naverProfile);
    }


    @ApiOperation(value = "네이버 통합 회원가입,로그인"
            , notes = "1. 네이버에서 받은 AccessToken을 매개변수로 삼아서 , \n 2-1. db에 회원가입이 되어있지 않으면 회원가입을하고 로그인을 해서 AccessToken을 반환합니다. \n 2-2. db에 있는 회원이면 바로 로그인을 해서 AccessToken을 반환합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "네이버 로그인 성공"
                    , response = SocialLoginAccessTokenDto.class
            )
            , @ApiResponse(
            code = 1200
            , message = "유효하지 않은 이미지 URL입니다."
    )
            , @ApiResponse(
            code = 1400
            , message = "네이버와 http통신이 실패하였습니다."
    )
            , @ApiResponse(
            code = 1402
            , message = "네이버 유저가 아닙니다."
    )
            , @ApiResponse(
            code = 1501
            , message = "S3에 업로드하는것을 실패하였습니다."
    )
    })
    @PostMapping("/naver/total")
    public ResponseEntity<Object> naverTotal(
            @ApiParam(value = "소셜 네이버 회원가입 dto", required = true)
            @RequestBody NaverLoginRequestDto naverLoginRequestDto) throws IOException {
        NaverProfile naverProfile = naverService.getNaverProfile(naverLoginRequestDto.getAccessToken());
        if (naverProfile == null) throw new CrewException(ErrorCode.NAVER_NOT_EXIST);


        Optional<User> user = userService.findByEmailAndProvider(naverProfile.getResponse().getEmail(), "naver");
        if (user.isPresent()) {
            TokenDto token = jwtProvider.createTokenDto(user.get().getUid(), user.get().getRoles(), false);
            SocialLoginAccessTokenDto accessTokenDto = new SocialLoginAccessTokenDto(token.getAccessToken(), false);

            return ResponseHandler.generateResponse("네이버 로그인 성공", HttpStatus.OK, accessTokenDto);
        } else {
            String nickName = userService.nickNameGenerator(naverProfile.getResponse().getName());
            Long userId = userService.naverSignup(UserSignUpRequestDto.builder()
                    .email(naverProfile.getResponse().getEmail())
                    .name(naverProfile.getResponse().getName())
                    .nickName(nickName)
                    .provider("naver")
                    .build());
            User NEW_USER = userService.findByUid(userId);
            String email_url = s3Uploader.nameFile(naverProfile.getResponse().getEmail(), "naver");
            userService.urlToImage(email_url, naverProfile.getResponse().getProfile_image(), NEW_USER);


            TokenDto token = jwtProvider.createTokenDto(userId, NEW_USER.getRoles(), false);
            SocialLoginAccessTokenDto accessTokenDto = new SocialLoginAccessTokenDto(token.getAccessToken(), true);

            return ResponseHandler.generateResponse("네이버 회원가입 성공", HttpStatus.OK, accessTokenDto);

        }
    }


    @ApiOperation(value = "카카오 통합 회원가입,로그인"
            , notes = "카카오로 회원가입 ,로그인을 합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "카카오 로그인 성공"
                    , response = SocialLoginAccessTokenDto.class
            )
            , @ApiResponse(
            code = 1200
            , message = "유효하지 않은 이미지 URL입니다."
    )
            , @ApiResponse(
            code = 1300
            , message = "카카오와 http통신이 실패하였습니다."
    )
            , @ApiResponse(
            code = 1302
            , message = "카카오 유저가 아닙니다."
    )
            , @ApiResponse(
            code = 1501
            , message = "S3에 업로드하는것을 실패하였습니다."
    )
    })
    @PostMapping("/kakao/total")
    public ResponseEntity<Object> kakaoTotal(
            @ApiParam(value = "1. 카카오에서 받은 AccessToken을 매개변수로 삼아서 , \n 2-1. db에 회원가입이 되어있지 않으면 회원가입을하고 로그인을 해서 AccessToken을 반환합니다. \n 2-2. db에 있는 회원이면 바로 로그인을 해서 AccessToken을 반환합니다.", required = true)
            @RequestBody KakaoLoginRequestDto kakaoLoginRequestDto) throws IOException {
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(kakaoLoginRequestDto.getAccessToken());
        if (kakaoProfile == null) throw new CrewException(ErrorCode.KAKAO_NOT_EXIST);
        if (kakaoProfile.getKakao_account().getEmail() == null) {
            kakaoService.kakaoUnlink(kakaoLoginRequestDto.getAccessToken());
            throw new CSocialAgreementException();
        }
        Optional<User> user = userService.findByEmailAndProvider(kakaoProfile.getKakao_account().getEmail(), "kakao");
        if (user.isPresent()) {
            TokenDto token = jwtProvider.createTokenDto(user.get().getUid(), user.get().getRoles(), false);
            SocialLoginAccessTokenDto accessTokenDto = new SocialLoginAccessTokenDto(token.getAccessToken(), false);
            return ResponseHandler.generateResponse("카카오 로그인 성공", HttpStatus.OK, accessTokenDto);
        } else {
            String nickName = userService.nickNameGenerator(kakaoProfile.getProperties().getNickname());
            Long userId = userService.kakaoSignup(UserSignUpRequestDto.builder()
                    .email(kakaoProfile.getKakao_account().getEmail())
                    .name(kakaoProfile.getProperties().getNickname())
                    .nickName(nickName)
                    .provider("kakao")
                    .build());
            User NEW_USER = userService.findByUid(userId);
            String email_url = s3Uploader.nameFile(kakaoProfile.getKakao_account().getEmail(), "kakao");
            s3Uploader.urlConvert(email_url, kakaoProfile.getKakao_account().getProfile().getProfile_image_url(), NEW_USER);

            TokenDto token = jwtProvider.createTokenDto(userId, NEW_USER.getRoles(), false);
            SocialLoginAccessTokenDto accessTokenDto = new SocialLoginAccessTokenDto(token.getAccessToken(), true);

            return ResponseHandler.generateResponse("카카오 회원가입 성공", HttpStatus.OK, accessTokenDto);

        }
    }

    @GetMapping("/test")
    public ResponseEntity<Object> passwordTest(String word) {
        userService.validationPasswd(word);
        return ResponseHandler.generateResponse("엑세스토큰 으로 유저 정보 조회 성공", HttpStatus.OK, null);

    }


}
