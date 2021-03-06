package matchTeam.crewcrew.controller.api.v1.user;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.ResponseTokenDto;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.social.*;
import matchTeam.crewcrew.dto.user.CodeDto;
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


    @ApiOperation(value = "?????????,????????? ??????????????? url ??????", notes = "???????????? ?????????")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "url ?????? ??????"
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
        return ResponseHandler.generateResponse("url ?????? ??????", HttpStatus.OK, oauthUrlResponseDto);
    }

    @ApiOperation(value = "????????? redirect url", notes = "????????? ????????? ???????????? ??? ????????? ??????????????? ???????????? ?????? ??????(Acess Token)??? ???????????????  ?????? ????????????.")
    @PostMapping(value = "/kakao/redirect")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "Kakao?????? ????????? AccessToken ?????? ??????"
                    , response = OauthRedirectDto.class
            )
            , @ApiResponse(
            code = 1300
            , message = "???????????? http????????? ?????????????????????."
    )
            , @ApiResponse(
            code = 1302
            , message = "????????? ????????? ????????????."
    )
    })
    public ResponseEntity<Object> redirectKakao(@ApiParam(value = "Authorization Code", required = true)
                                                @RequestBody CodeDto code, HttpServletResponse response) {
        RetKakaoOAuth kakaoResult = kakaoService.getKakaoTokenInfo(code.getCode());
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
            return ResponseHandler.generateResponse("????????? ????????? ??????", HttpStatus.OK, null);


        } else {
            User new_user = userService.kakaoRegister(kakaoProfile);

            ResponseTokenDto token = jwtProvider.createResponseToken(new_user.getUid(), new_user.getRoles(), true);
            cookieService.responseCookie(response, token);


            return ResponseHandler.generateResponse("????????? ???????????? ??????", HttpStatus.OK, null);

        }

    }

    @ApiOperation(value = "????????? redirect url", notes = "????????? ????????? ???????????? ??? ????????? ??????????????? ???????????? ?????? ??????(Acess Token)??? ???????????????  ?????? ????????????.")
    @PostMapping(value = "/naver/redirect")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "Naver?????? ????????? AccessToken ?????? ??????"
                    , response = OauthRedirectDto.class
            )
            , @ApiResponse(
            code = 1400
            , message = "???????????? http????????? ?????????????????????."
    )
            , @ApiResponse(
            code = 1402
            , message = "????????? ????????? ????????????."
    )
    })

    public ResponseEntity<Object> redirectNaver(@ApiParam(value = "Authorization Code", required = true)
                                                @RequestBody CodeDto code, HttpServletResponse response) {
        System.out.println("?????? RequestBody ?????? = "+code.getCode());
        RetNaverOAuth naverResult = naverService.getNaverTokenInfo(code.getCode());
        NaverProfile naverProfile = naverService.getNaverProfile(naverResult.getAccess_token());
        if (naverProfile == null) throw new CrewException(ErrorCode.NAVER_NOT_EXIST);
        Optional<User> user = userService.findByEmailAndProvider(naverProfile.getResponse().getEmail(), "naver");
        if (user.isPresent()) {
            ResponseTokenDto token = jwtProvider.createResponseToken(user.get().getUid(), user.get().getRoles(), true);
            cookieService.responseCookie(response, token);

            return ResponseHandler.generateResponse("????????? ????????? ??????", HttpStatus.OK, null);
        } else {
            User new_user = userService.naverRegister(naverProfile);

            ResponseTokenDto token = jwtProvider.createResponseToken(new_user.getUid(), new_user.getRoles(), true);
            cookieService.responseCookie(response, token);

            return ResponseHandler.generateResponse("????????? ???????????? ??????", HttpStatus.OK, null);

        }


    }

    @GetMapping("/kakao/token/{accessToken}")
    @ApiOperation(value = "????????? ?????? ????????????"
            , notes = "??????????????? ????????? ?????? ????????? ?????? ????????? ???????????????.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "????????? ?????? ?????? AcessToken ?????? ??????")
            , @ApiResponse(
            code = 1300
            , message = "???????????? http????????? ?????????????????????."
    )
            , @ApiResponse(
            code = 1302
            , message = "????????? ????????? ????????????."
    )
    })


    public ResponseEntity<Object> tokenCheckKakao(
            @ApiParam(value = "??????????????? ?????? Access ??????", required = true)
            @RequestParam String accessToken) {
        KakaoProfile kakaoProfile = kakaoService.getKakaoProfile(accessToken);
        if (kakaoProfile == null) throw new CrewException(ErrorCode.KAKAO_NOT_EXIST);

        return ResponseHandler.generateResponse("????????? ?????? ?????? AcessToken ?????? ??????", HttpStatus.OK, kakaoProfile);
    }


    @ApiOperation(value = "????????? ?????? ????????????"
            , notes = "??????????????? ????????? ?????? ????????? ?????? ????????? ???????????????.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "Naver?????? ????????? AccessToken ?????? ??????"
                    , response = NaverProfile.class
            )
            , @ApiResponse(
            code = 1400
            , message = "???????????? http????????? ?????????????????????."
    )
            , @ApiResponse(
            code = 1402
            , message = "????????? ????????? ????????????."
    )
    })
    @GetMapping("/naver/token/{accessToken}")
    public ResponseEntity<Object> tokenCheckNaver(
            @ApiParam(value = "??????????????? ?????? Access ??????", required = true)
            @RequestParam String accessToken) {
        NaverProfile naverProfile = naverService.getNaverProfile(accessToken);
        if (naverProfile == null) throw new CrewException(ErrorCode.PK_USER_NOT_FOUND);

        return ResponseHandler.generateResponse("????????? ?????? ?????? AcessToken ?????? ??????", HttpStatus.OK, naverProfile);
    }


    @ApiOperation(value = "????????? ?????? ????????????,?????????"
            , notes = "1. ??????????????? ?????? AccessToken??? ??????????????? ????????? , \n 2-1. db??? ??????????????? ???????????? ????????? ????????????????????? ???????????? ?????? AccessToken??? ???????????????. \n 2-2. db??? ?????? ???????????? ?????? ???????????? ?????? AccessToken??? ???????????????.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "????????? ????????? ??????"
                    , response = SocialLoginAccessTokenDto.class
            )
            , @ApiResponse(
            code = 1200
            , message = "???????????? ?????? ????????? URL?????????."
    )
            , @ApiResponse(
            code = 1400
            , message = "???????????? http????????? ?????????????????????."
    )
            , @ApiResponse(
            code = 1402
            , message = "????????? ????????? ????????????."
    )
            , @ApiResponse(
            code = 1501
            , message = "S3??? ????????????????????? ?????????????????????."
    )
    })
    @PostMapping("/naver/total")
    public ResponseEntity<Object> naverTotal(
            @ApiParam(value = "?????? ????????? ???????????? dto", required = true)
            @RequestBody NaverLoginRequestDto naverLoginRequestDto) throws IOException {
        NaverProfile naverProfile = naverService.getNaverProfile(naverLoginRequestDto.getAccessToken());
        if (naverProfile == null) throw new CrewException(ErrorCode.NAVER_NOT_EXIST);


        Optional<User> user = userService.findByEmailAndProvider(naverProfile.getResponse().getEmail(), "naver");
        if (user.isPresent()) {
            TokenDto token = jwtProvider.createTokenDto(user.get().getUid(), user.get().getRoles(), false);
            SocialLoginAccessTokenDto accessTokenDto = new SocialLoginAccessTokenDto(token.getAccessToken(), false);

            return ResponseHandler.generateResponse("????????? ????????? ??????", HttpStatus.OK, accessTokenDto);
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

            return ResponseHandler.generateResponse("????????? ???????????? ??????", HttpStatus.OK, accessTokenDto);

        }
    }


    @ApiOperation(value = "????????? ?????? ????????????,?????????"
            , notes = "???????????? ???????????? ,???????????? ?????????.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "????????? ????????? ??????"
                    , response = SocialLoginAccessTokenDto.class
            )
            , @ApiResponse(
            code = 1200
            , message = "???????????? ?????? ????????? URL?????????."
    )
            , @ApiResponse(
            code = 1300
            , message = "???????????? http????????? ?????????????????????."
    )
            , @ApiResponse(
            code = 1302
            , message = "????????? ????????? ????????????."
    )
            , @ApiResponse(
            code = 1501
            , message = "S3??? ????????????????????? ?????????????????????."
    )
    })
    @PostMapping("/kakao/total")
    public ResponseEntity<Object> kakaoTotal(
            @ApiParam(value = "1. ??????????????? ?????? AccessToken??? ??????????????? ????????? , \n 2-1. db??? ??????????????? ???????????? ????????? ????????????????????? ???????????? ?????? AccessToken??? ???????????????. \n 2-2. db??? ?????? ???????????? ?????? ???????????? ?????? AccessToken??? ???????????????.", required = true)
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
            return ResponseHandler.generateResponse("????????? ????????? ??????", HttpStatus.OK, accessTokenDto);
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

            return ResponseHandler.generateResponse("????????? ???????????? ??????", HttpStatus.OK, accessTokenDto);

        }
    }

    @GetMapping("/test")
    public ResponseEntity<Object> passwordTest(String word) {
        userService.validationPasswd(word);
        return ResponseHandler.generateResponse("??????????????? ?????? ?????? ?????? ?????? ??????", HttpStatus.OK, null);

    }


}
