package matchTeam.crewcrew.config.security;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.config.RedisUtil;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.service.user.CookieService;
import matchTeam.crewcrew.service.user.CustomUserDetailService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtProvider jwtProvider;


    @Autowired
    private CookieService cookieService;

    @Autowired
    private CustomUserDetailService userDetailsService;
    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final Cookie jwtToken = getCookie(request, "X-AUTH-TOKEN");

        Long uid = null;
        String jwt = null;
        String refreshJwt = null;
        String refreshUname = null;

        try {
            if (jwtToken != null) {
                jwt = jwtToken.getValue();
                uid = jwtProvider.getUserUid(jwt);
            }
            if (uid != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(Long.toString(uid));
                if (jwtProvider.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        } catch (ExpiredJwtException e) {
            Cookie refreshToken = getCookie(request, "refreshToken");
            if (refreshToken != null) {
                refreshJwt = refreshToken.getValue();
                if (refreshJwt != null) {
                    refreshUname = redisUtil.getData(refreshJwt);
                    if (refreshUname.equals(jwtProvider.getUserUid(refreshJwt))) {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(refreshUname);
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                        User user = userRepository.findByUid(Long.parseLong(refreshUname));
                        String newToken = jwtProvider.createToken(uid, user.getRoles(), jwtProvider.accessTokenValidMillisecond);

                        Cookie newCookie = cookieService.generateCookie("X-AUTH-TOKEN", newToken, 60 * 60 * 1000L);
                        response.addCookie(newCookie);
                    }
                }
            }
        } catch (Exception e) {

        }
        try {
            if (refreshJwt != null) {
                refreshUname = redisUtil.getData(refreshJwt);
                if (refreshUname.equals(jwtProvider.getUserUid(refreshJwt))) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(refreshUname);
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                    User user = userRepository.findByUid(Long.parseLong(refreshUname));
                    String newToken = jwtProvider.createToken(uid, user.getRoles(), jwtProvider.accessTokenValidMillisecond);

                    Cookie newCookie = cookieService.generateCookie("X-AUTH-TOKEN", newToken, 60 * 60 * 1000L);
                    response.addCookie(newCookie);
                }
            }
        } catch (ExpiredJwtException e) {

        }
        filterChain.doFilter(request, response);
    }


//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String accessToken = jwtProvider.resolveAccessToken(request);
//        String refreshToken = jwtProvider.resolveRefreshToken(request);
//
//
////        String accessToken = cookieService.getCookie(request,"X-AUTH-TOKEN").getValue();
////        String refreshToken = cookieService.getCookie(request,"refreshToken").getValue();
//
//        if (accessToken != null) {
//            if (jwtProvider.validateToken(request,accessToken)) {
//                System.out.println("--------------------------------인증 성공-----------------------------------------");
//                this.setAuthentication(accessToken);
//            } else if (!jwtProvider.validateToken(request,accessToken) && refreshToken != null) {
//                System.out.println("--------------------------------재발급 과정-----------------------------------------");
//                boolean validateRefreshToken = jwtProvider.validateToken(request,refreshToken);
//                boolean isRefreshToken = jwtProvider.existRefreshToken(refreshToken);
//
//                System.out.println("validateRefreshToken 의 경우(refresh 토큰이 유효 한지)"+ validateRefreshToken);
//                System.out.println("isRefreshToken 의 경우(refresh 토큰이 존재하는지)"+ isRefreshToken);
//                if (validateRefreshToken && isRefreshToken) {
//                    Long uid = jwtProvider.getUserUid(refreshToken);
//                    List<String> roles = jwtProvider.getRoles(uid);
//
//                    System.out.println("교체 --------------------------- 작업 ");
//                    String newAccessToken = jwtProvider.createToken(uid, roles, jwtProvider.accessTokenValidMillisecond);
//                    response.addCookie(cookieService.generateCookie("X-AUTH-TOKEN", newAccessToken, jwtProvider.accessTokenValidMillisecond));
//                    this.setAuthentication(newAccessToken);
//                }
//                System.out.println("--------------------------------토큰 교체 완료-----------------------------------------");
//            }
//        }
//
//        filterChain.doFilter(request, response);
//
//    }


    private Cookie getCookie(HttpServletRequest req, String cookieName) {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName))
                    return cookie;
            }
        }
        return null;
    }

    public void setAuthentication(String token) {
        Authentication authentication = jwtProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
