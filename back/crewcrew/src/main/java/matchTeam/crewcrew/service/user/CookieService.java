package matchTeam.crewcrew.service.user;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class CookieService {

    private final JwtProvider jwtProvider;

    public Cookie generateCookie(String name, String value, Long time) {
        Cookie cookie = new Cookie(name, value);
        cookie.setDomain("crewcrew.org");
        cookie.setMaxAge(time.intValue()/1000);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    public Cookie generateXAuthCookie(String name, String value, Long time) {
        Cookie cookie = new Cookie(name, value);
        cookie.setDomain("crewcrew.org");
        cookie.setMaxAge(time.intValue()/1000);
        cookie.setPath("/");
        cookie.setSecure(true);
        return cookie;
    }

    public Cookie getCookie(HttpServletRequest req, String cookieName) {
        Cookie[] cookies = req.getCookies();
        if (cookies!=null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName))
                    return cookie;
            }
        }
        return null;
    }

    public void logOut(HttpServletRequest request, HttpServletResponse response){
        Cookie accessToken = getCookie(request,"X-AUTH-TOKEN");
        Cookie refreshToken = getCookie(request,"refreshToken");
        if (accessToken!=null){
            accessToken.setValue(null);
            accessToken.setMaxAge(0);
            response.addCookie(accessToken);
        }
        if (refreshToken!=null){
            refreshToken.setValue(null);
            refreshToken.setMaxAge(0);
            response.addCookie(refreshToken);
        }

    }
}
