package matchTeam.crewcrew.config.security;

import freemarker.template.utility.StringUtil;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.response.exception.auth.CAuthenticationEntryPointException;
import matchTeam.crewcrew.service.user.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${spring.jwt.secret}")
    private String secretKey;

//    private String secretKey="lalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefala";
//    private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private String ROLES="roles";
    private final long accessTokenValidMillisecond =60 * 60 * 1000L;           // 1일
    private final long refreshTokenValidMillisecond =14* 24 *60 * 60 * 1000L;  // 14일
    private final CustomUserDetailService userDetailsService;

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init(){
//        key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        System.out.println(secretKey);
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        System.out.println(secretKey);
//        secretKey = Base64UrlCodec.BASE64URL.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    //JWT 토큰 생성
    public TokenDto createTokenDto(Long userPk , List<String> roles){
        Claims claims = Jwts.claims().setSubject(String.valueOf(userPk));
        claims.put(ROLES,roles);
        Date now = new Date();

        String accessToken =Jwts.builder().
                setHeaderParam(Header.TYPE,Header.JWT_TYPE)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() +accessTokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256,secretKey)
//                .signWith(key)
                .compact();

        String refreshToken =Jwts.builder()
                .setHeaderParam(Header.TYPE,Header.JWT_TYPE)
                .setExpiration(new Date(now.getTime() +refreshTokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256,secretKey)
//                .signWith(key)
                .compact();

        return TokenDto.builder()
                .grantType("bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpireDate(accessTokenValidMillisecond)
                .build();
    }
    public Authentication getAuthentication(String token){

        Claims claims = parseClaims(token);
        if(claims.get(ROLES)==null){
            throw new CAuthenticationEntryPointException();
        }

        UserDetails userDetails =userDetailsService.loadUserByUsername(claims.getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails,"",userDetails.getAuthorities());

    }

    public ResponseCookie createTokenCookie( String token){
      return ResponseCookie.from("refreshToken",token)
              .httpOnly(true)
              .secure(true)
              .path("/")
              .maxAge(60*30L)
              .build();
    }

    public Claims parseClaims(String token) {
        try{

            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
//            return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
//            return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
//            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        }catch(ExpiredJwtException e){
            return e.getClaims();
        }
    }

    // HTTP Request 의 Header에서 Token Parsing -> "X-AUTH_TOKEN: jwt"
    public String resolveToken(HttpServletRequest request){
        return request.getHeader("X-AUTH-TOKEN");
    }

    public boolean validateToken(String token){
        try{
           Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
           return true;
        }catch (JwtException | IllegalArgumentException e){
            log.error(e.toString());
            return false;
        }
    }



}
