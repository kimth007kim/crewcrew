package matchTeam.crewcrew.controller.api.v1.user;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.social.NaverLoginRequestDto;
import matchTeam.crewcrew.dto.social.RetKakaoOAuth;
import matchTeam.crewcrew.dto.social.RetNaverOAuth;
import matchTeam.crewcrew.dto.user.AccessTokenDto;
import matchTeam.crewcrew.dto.user.example.OauthUrlResponseDto;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.user.KakaoService;
import matchTeam.crewcrew.service.user.NaverService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

@Api(tags=" 5. Oauth 2.0 컨트롤러 ")
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OauthController {

    private final RestTemplate restTemplate;
    private final Environment env;
    private final KakaoService kakaoService;
    private final NaverService naverService;

    @Value("${url.base}")
    private String baseUrl;

    @Value("${social.kakao.client-id}")
    private String kakaoClientId;

    @Value("${social.kakao.redirect}")
    private String kakaoRedirectUri ;

    @Value("${social.naver.client-id}")
    private String naverClientId;

    @Value("${social.naver.redirect}")
    private String naverRedirectUri ;

    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "url 호출 성공"
                    ,response = OauthUrlResponseDto.class
            )
    })
    
    @GetMapping("/login")
    public ResponseEntity<Object> socialLogin() {
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
        OauthUrlResponseDto oauthUrlResponseDto = new OauthUrlResponseDto(kakao,naver);
        return ResponseHandler.generateResponse("url 호출 성공", HttpStatus.OK, oauthUrlResponseDto);
    }

    @ApiOperation(value = "카카오 redirect url", notes = "카카오 redirect url")
    @GetMapping(value="/kakao/redirect")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "Kakao에서 발행한 AccessToken 발급 성공"
                    ,response = AccessTokenDto.class
            )
            , @ApiResponse(
            code = 1300
            , message ="카카오와 http통신이 실패하였습니다."
    )
    })
    public ResponseEntity<Object> redirectKakao(@ApiParam(value = "Authorization Code",required = true)
                                                  @RequestParam String code) {
        RetKakaoOAuth kakaoResult =kakaoService.getKakaoTokenInfo(code);
        return ResponseHandler.generateResponse("Kakao에서 발행한 AccessToken 발급 성공", HttpStatus.OK, new AccessTokenDto(kakaoResult.getAccess_token()));
    }

    @ApiOperation(value = "네이버 redirect url", notes = "네이버 redirect url")
    @GetMapping(value="/naver/redirect")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "Naver에서 발행한 AccessToken 발급 성공"
                    ,response = AccessTokenDto.class
            )
            , @ApiResponse(
            code = 1400
            , message ="네이버와 http통신이 실패하였습니다."
    )
    })
    
    public ResponseEntity<Object> redircetNaver(@ApiParam(value = "Authorization Code",required = true)
                                                @RequestParam String code) {
        RetNaverOAuth naverResult =naverService.getNaverTokenInfo(code);
        return ResponseHandler.generateResponse("Naver에서 발행한 AccessToken 발급 성공", HttpStatus.OK, new AccessTokenDto(naverResult.getAccess_token()));
    }

}
