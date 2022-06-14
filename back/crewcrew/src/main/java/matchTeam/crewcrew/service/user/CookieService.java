package matchTeam.crewcrew.service.user;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.ResponseTokenDto;
import matchTeam.crewcrew.entity.user.User;
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
            Cookie logoutAccessToken = generateCookie("X-AUTH-TOKEN",null,0L);
//            accessToken.setValue(null);
//            accessToken.setMaxAge(0);
//            response.addCookie(accessToken);
            response.addCookie(logoutAccessToken);
        }
        if (refreshToken!=null){
            Cookie logoutRefreshToken = generateCookie("refreshToken",null,0L);
//            refreshToken.setValue(null);
//            refreshToken.setMaxAge(0);
//            response.addCookie(refreshToken);
            response.addCookie(logoutRefreshToken);
        }

    }
    public void responseCookie( HttpServletResponse response, ResponseTokenDto token){
        Cookie accessCookie =generateXAuthCookie("X-AUTH-TOKEN", token.getAccessToken(), token.getAccessTokenExpireDate());
        Cookie refreshCookie =generateCookie("refreshToken", token.getRefreshToken(), token.getRefreshTokenExpireDate());
        System.out.println("11여기 생성된 refreshToken= " + token.getRefreshToken());
        System.out.println("11여기 생성된 accessToken= " + token.getAccessToken());
        System.out.println("22여기 생성된 refreshCookie = " + refreshCookie);
        System.out.println("22여기 생성된 accessCookie = " + accessCookie);
        System.out.println("333 지속시간 refreshToken"+token.getRefreshTokenExpireDate());
        System.out.println("333 지속시간 accessToken"+token.getAccessTokenExpireDate());
        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
    }

}
