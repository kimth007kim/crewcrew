package matchTeam.crewcrew.config.security;

import io.jsonwebtoken.MalformedJwtException;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.response.ErrorResponseHandler;
import matchTeam.crewcrew.service.user.CookieService;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.auth.CUserNotFoundException;
import matchTeam.crewcrew.response.exception.auth.CrewException;
import matchTeam.crewcrew.service.user.CookieService;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final CookieService cookieService;


//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String accessToken = jwtProvider.resolveAccessToken(request);
//        String refreshToken = jwtProvider.resolveRefreshToken(request);
//
//        if (accessToken != null) {
//            if (jwtProvider.validateToken(accessToken)) {
//                this.setAuthentication(accessToken);
//            } else if (!jwtProvider.validateToken(accessToken) && refreshToken != null) {
//                boolean validateRefreshToken = jwtProvider.validateToken(refreshToken);
//                boolean isRefreshToken = jwtProvider.existRefreshToken(refreshToken);
//                if (validateRefreshToken && isRefreshToken) {
//                    Long uid = jwtProvider.getUserUid(refreshToken);
//                    List<String> roles = jwtProvider.getRoles(uid);
//                    String newAccessToken = jwtProvider.createToken(uid, roles, jwtProvider.accessTokenValidMillisecond);
//                    response.addCookie(cookieService.generateAccessToken(newAccessToken));
//                    this.setAuthentication(newAccessToken);
//                }
//                filterChain.doFilter(request, response);
//            }
//        }
//
//
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = jwtProvider.resolveAccessToken(request);
        String refreshToken = jwtProvider.resolveRefreshToken(request);

        if (accessToken != null) {
            if (jwtProvider.validateToken(request,accessToken)) {
                System.out.println("--------------------------------인증 성공-----------------------------------------");
                this.setAuthentication(accessToken);
            } else if (!jwtProvider.validateToken(request,accessToken) && refreshToken != null) {
                System.out.println("--------------------------------재발급 과정-----------------------------------------");
                boolean validateRefreshToken = jwtProvider.validateToken(request,refreshToken);
                boolean isRefreshToken = jwtProvider.existRefreshToken(refreshToken);

                System.out.println("validateRefreshToken 의 경우(refresh 토큰이 유효 한지)"+ validateRefreshToken);
                System.out.println("isRefreshToken 의 경우(refresh 토큰이 존재하는지)"+ isRefreshToken);
                if (validateRefreshToken && isRefreshToken) {
                    Long uid = jwtProvider.getUserUid(refreshToken);
                    List<String> roles = jwtProvider.getRoles(uid);

                    System.out.println("교체 --------------------------- 작업 ");
                    String newAccessToken = jwtProvider.createToken(uid, roles, jwtProvider.accessTokenValidMillisecond);
                    response.addCookie(cookieService.generateCookie("X-AUTH-TOKEN", newAccessToken, jwtProvider.accessTokenValidMillisecond));
                    this.setAuthentication(newAccessToken);
                }
                System.out.println("--------------------------------토큰 교체 완료-----------------------------------------");
            }
        }

        filterChain.doFilter(request, response);

    }

    public void setAuthentication(String token) {
        Authentication authentication = jwtProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
