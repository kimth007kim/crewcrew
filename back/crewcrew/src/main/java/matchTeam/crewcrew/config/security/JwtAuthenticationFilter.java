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
        final Cookie refreshToken = getCookie(request,"refreshToken");

        log.info("X-AUTH-TOKEN = "+jwtToken);
        log.info("refreshToken = "+refreshToken);
        Long uid = null;
        String jwt = null;
        String refreshJwt = null;
        String refreshUname = null;

        try {
            if (jwtToken != null) {
                log.info("-------------------- access 토큰이 존재할경우 log -----------");
                jwt = jwtToken.getValue();
                uid = jwtProvider.getUserUid(jwt);
                if (uid != null) {
                    log.info("-------------------- uid가 존재할경우 log  -----------");
                    UserDetails userDetails = userDetailsService.loadUserByUsername(Long.toString(uid));
                    if (jwtProvider.validateToken(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    }
                }
            }else{
                if (refreshJwt != null) {
                    log.info("--------------------Acess 토큰 없고 refresh 토큰있다-----------");
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

        } catch (ExpiredJwtException e) {
            log.info("--------------------토큰이 만료되었을 경우에 뜨는 log -----------");
            if (refreshToken != null) {
                log.info("--------------------토큰이 만료되었고 refresh 토큰이 있을때 log -----------");
                refreshJwt = refreshToken.getValue();
                if (refreshJwt != null) {
                    refreshUname = redisUtil.getData(refreshJwt);
                    log.info("--------------------Redis 에서 가져온 UID -----------"+refreshUname);
                    if (refreshUname.equals(jwtProvider.getUserUid(refreshJwt))) {
                        log.info("--------------------Redis 조회결과 같을때 -----------");
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
//        try {
//            if (refreshJwt != null && jwtToken==null) {
//                log.info("--------------------Acess 토큰 없고 refresh 토큰있다-----------");
//                refreshUname = redisUtil.getData(refreshJwt);
//                if (refreshUname.equals(jwtProvider.getUserUid(refreshJwt))) {
//                    UserDetails userDetails = userDetailsService.loadUserByUsername(refreshUname);
//                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//
//                    User user = userRepository.findByUid(Long.parseLong(refreshUname));
//                    String newToken = jwtProvider.createToken(uid, user.getRoles(), jwtProvider.accessTokenValidMillisecond);
//
//                    Cookie newCookie = cookieService.generateCookie("X-AUTH-TOKEN", newToken, 60 * 60 * 1000L);
//                    response.addCookie(newCookie);
//                }
//            }
//        } catch (ExpiredJwtException e) {
//
//        }
        filterChain.doFilter(request, response);
    }


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
