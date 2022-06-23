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
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.xpath.XPath;
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
        log.info("필터 가 호출되었습니다.");

        log.info("X-AUTH-TOKEN = "+jwtToken);
        log.info("refreshToken = "+refreshToken);
        Long uid = null;
        String jwt = null;
        String refreshJwt = null;
        String refreshUname = null;
        if (jwtToken != null){
            jwt = jwtToken.getValue();
        }

        try {
            if(jwt != null && jwtProvider.validateToken(jwt)){
                log.info("-------------------- access 토큰이 존재할경우 log -----------");
                uid = jwtProvider.getUserUid(jwt);
                if (uid != null ) {
                    log.info("-------------------- uid가 존재할경우 log  -----------");
                    UserDetails userDetails = userDetailsService.loadUserByUsername(Long.toString(uid));
                    if (jwtProvider.validateToken(jwt, userDetails)) {
                        Authentication authentication= jwtProvider.getAuthentication(jwt);
//                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }else {
                if (refreshToken != null) {
                    refreshJwt = refreshToken.getValue();
                    log.info("--------------------Acess 토큰 없고 refresh 토큰있다-----------");
                    refreshUname = redisUtil.getData(refreshJwt);
                    log.info("조회한 refreshUname (id값)"+refreshUname);
                    if (refreshUname.equals(Long.toString(jwtProvider.getUserUid(refreshJwt)))) {
                        log.info("--------------------Redis 에 존재 한다.-----------");

                        Authentication authentication= jwtProvider.getAuthentication(refreshJwt);
                       SecurityContextHolder.getContext().setAuthentication(authentication);
                        User user = userRepository.findByUid(Long.parseLong(refreshUname));

                        String newToken = jwtProvider.createToken(user.getUid(), user.getRoles(), jwtProvider.accessTokenValidMillisecond);
                        log.info("--------------------새로운 토큰 발급-----------"+newToken);

                        Cookie newCookie = cookieService.generateXAuthCookie("X-AUTH-TOKEN", newToken, 60 * 60 * 1000L);
                        response.addCookie(newCookie);

                    }
                }
            }


        } catch (Exception e) {

        }

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
