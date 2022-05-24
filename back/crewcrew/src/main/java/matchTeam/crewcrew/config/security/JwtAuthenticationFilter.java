package matchTeam.crewcrew.config.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.service.user.CookieService;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
//public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtProvider jwtProvider;
    private final CookieService cookieService;
//    public JwtAuthenticationFilter(JwtProvider jwtProvider) {
//        this.jwtProvider = jwtProvider;
//    }


    // request 로 들어오는 JWT의 유효성 검증 - JWTproviider.validationToken()
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterchain) throws IOException, ServletException {
//        //헤더에서 JWT를 받아온다
//        String token = jwtProvider.resolveToken((HttpServletRequest) request);
//        System.out.println("==========================="+token);
//
//
//        //검증
//        log.info("[Verifying token]");
//        log.info(((HttpServletRequest)request).getRequestURL().toString());
//
////        if (!jwtProvider.validateToken(token)){
////            throw new UserNotFoundException();
////        }
//        // 유효한 토큰인지 확인
//        if(token != null && jwtProvider.validateToken(token)){
//            //토큰이 유효하면 토큰으로부터 유저정보를 받아온다.
//            Authentication authentication = jwtProvider.getAuthentication(token);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//        filterchain.doFilter(request,response);
//    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = jwtProvider.resolveAccessToken(request);
        String refreshToken = jwtProvider.resolveRefreshToken(request);

        if (accessToken != null) {
            if (jwtProvider.validateToken(accessToken)) {
                this.setAuthentication(accessToken);
            } else if (!jwtProvider.validateToken(accessToken) && refreshToken != null) {
                boolean validateRefreshToken = jwtProvider.validateToken(refreshToken);
                boolean isRefreshToken = jwtProvider.existRefreshToken(refreshToken);
                if (validateRefreshToken && isRefreshToken) {
                    Long uid = jwtProvider.getUserUid(refreshToken);
                    List<String> roles = jwtProvider.getRoles(uid);
                    String newAccessToken = jwtProvider.createToken(uid, roles, jwtProvider.accessTokenValidMillisecond);
                    response.addCookie(cookieService.generateAccessToken(newAccessToken));
                    this.setAuthentication(newAccessToken);
                }
                filterChain.doFilter(request, response);
            }
        }

    }

    public void setAuthentication(String token) {
        Authentication authentication = jwtProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
