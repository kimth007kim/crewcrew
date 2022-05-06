package matchTeam.crewcrew.config.security;

import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtProvider jwtProvider;

    public JwtAuthenticationFilter(JwtProvider jwtProvider) {
        this.jwtProvider=jwtProvider;
    }


    // request 로 들어오는 JWT의 유효성 검증 - JWTproviider.validationToken()
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterchain) throws IOException, ServletException {
        //헤더에서 JWT를 받아온다
        String token = jwtProvider.resolveToken((HttpServletRequest) request);
        System.out.println("==========================="+token);


        //검증
        log.info("[Verifying token]");
        log.info(((HttpServletRequest)request).getRequestURL().toString());

//        if (!jwtProvider.validateToken(token)){
//            throw new UserNotFoundException();
//        }
        // 유효한 토큰인지 확인
        if(token != null && jwtProvider.validateToken(token)){
            //토큰이 유효하면 토큰으로부터 유저정보를 받아온다.
            Authentication authentication = jwtProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterchain.doFilter(request,response);
    }
}
