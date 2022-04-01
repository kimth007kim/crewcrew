//package matchTeam.crewcrew.controller.api.v1.oauth;
//
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiParam;
//import lombok.RequiredArgsConstructor;
//import matchTeam.crewcrew.service.user.KakaoService;
//import matchTeam.crewcrew.service.user.NaverService;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.env.Environment;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.servlet.ModelAndView;
//
//@Api(tags=" 3. Oauth 2.0 kakao Login ")
//@Controller
//@RequiredArgsConstructor
//@RequestMapping("/oauth_view")
//public class OauthKakaoController {
//
//    private final RestTemplate restTemplate;
//    private final Environment env;
//    private final KakaoService kakaoService;
//    private final NaverService naverService;
//
//    @Value("${url.base}")
//    private String baseUrl;
//
//    @Value("${social.kakao.client-id}")
//    private String kakaoClientId;
//
//    @Value("${social.kakao.redirect}")
//    private String kakaoRedirectUri ;
//
//    @Value("${social.naver.client-id}")
//    private String naverClientId;
//
//    @Value("${social.naver.redirect}")
//    private String naverRedirectUri ;
//
//
//    @GetMapping("/login")
//    public ModelAndView socialLogin(ModelAndView mav) {
//
//        System.out.println(naverClientId);
//
//
//        StringBuilder kakaoLoginUri = new StringBuilder()
//                .append(env.getProperty("social.kakao.url.login"))
//                .append("?response_type=code")
//                .append("&client_id=").append(kakaoClientId)
//                .append("&redirect_uri=").append(baseUrl).append(kakaoRedirectUri);
//        mav.addObject("kakaoLoginUri", kakaoLoginUri);
//
//
//        StringBuilder naverLoginUri = new StringBuilder()
//                .append(env.getProperty("social.naver.url.login"))
//                .append("?response_type=code")
//                .append("&state=STATE_STRING")
//                .append("&client_id=").append(naverClientId)
//                .append("&redirect_uri=").append(baseUrl).append(naverRedirectUri);
//        mav.addObject("naverLoginUrl", naverLoginUri);
//        System.out.println(naverLoginUri);
//        mav.setViewName("social/login");
//        return mav;
//    }
//
//    @GetMapping(value="/kakao/redirect")
//    public ModelAndView redirectKakao(
//            ModelAndView mav, @ApiParam(value = "Authorization Code",required = true)
//            @RequestParam String code){
//        mav.addObject("authInfo",kakaoService.getKakaoTokenInfo(code));
//        mav.setViewName("social/redirectKakao");
//        return mav;
//    }
//
//    @GetMapping(value="/naver/redirect")
//    public ModelAndView redirectNaver(
//        ModelAndView mav ,@ApiParam(value = "Authorization Code",required = true)
//                @RequestParam String code){
////        mav.addObject("")
//        mav.addObject("authInfo",naverService.getNaverTokenInfo(code));
//        mav.setViewName("social/redirectNaver");
//        return mav;
//    }
//
//
//
//}
