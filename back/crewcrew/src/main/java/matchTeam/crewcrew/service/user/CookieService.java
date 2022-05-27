package matchTeam.crewcrew.service.user;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class CookieService {

    private final JwtProvider jwtProvider;

    public Cookie generateCookie(String name, String value, Long time) {
        Cookie cookie = new Cookie(name, value);
        cookie.setDomain("crewcrew.org");
        cookie.setMaxAge(time.intValue());
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    public Cookie getCookie(HttpServletRequest req, String cookieName){
        final Cookie[] cookies = req.getCookies();
        if(cookies == null) return null;
        for(Cookie cookie: cookies){
            if(cookie.getName().equals(cookieName)){
                return cookie;
            }
        }
        return null;
    }

//    public Cookie generateRefreshToken(String value, Long time) {
//        return generateCookie("refreshToken", value, time/1000);
//    }
//
//    public Cookie generateAccessToken(String value) {
//        return generateCookie("X-AUTH-TOKEN", value, jwtProvider.accessTokenValidMillisecond/1000);
//    }
}
