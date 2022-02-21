//package matchTeam.crewcrew.controller.api.v1.user;
//
//import io.swagger.annotations.Api;
//import lombok.RequiredArgsConstructor;
//import matchTeam.crewcrew.config.security.JwtProvider;
//import matchTeam.crewcrew.response.ResponseHandler;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.servlet.http.HttpServletResponse;
//
//@Api(tags = "1. Auth")
//@RequiredArgsConstructor
//@RestController
////@RequestMapping("/api/v1/auth/")
//@RequestMapping("/auth")
//public class cookieController {
//    private final JwtProvider jwtProvider;
//    @PostMapping("/login/cookie")
//    public ResponseEntity<?> createAuthenticationToken( HttpServletResponse response) throws Exception{
//
//
//        ResponseCookie responseCookie = ResponseCookie.from("refreshToken","sadasd")
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(60*60*60*24)
//                .build();
//        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
//                .body(new ResponseHandler().generateResponse("인증번호 발송 성공", HttpStatus.OK, "code"));
//
//    }
//}
