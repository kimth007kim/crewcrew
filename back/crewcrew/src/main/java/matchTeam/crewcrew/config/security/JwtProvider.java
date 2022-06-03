package matchTeam.crewcrew.config.security;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.config.RedisUtil;
import matchTeam.crewcrew.dto.security.ResponseTokenDto;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.auth.CAuthenticationEntryPointException;
import matchTeam.crewcrew.service.user.CustomUserDetailService;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final CustomUserDetailService userDetailsService;
    private final RedisUtil redisUtil;
    private final UserRepository userRepository;

    @Value("${spring.jwt.secret}")
    private String secretKey;

    //    private String secretKey="lalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefalalalfadgsfgadsgvsdvfsdgwefala";
//    private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private String ROLES = "roles";
    public static final long accessTokenValidMillisecond = 3* 60 * 60 * 1000L;           // 30분
    public static final long refreshTokenShortValidMillisecond =  24 * 60 * 60 * 1000L;           // 1일
    public static final long refreshTokenLongValidMillisecond = 7 * 24 * 60 * 60 * 1000L;  // 7일

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init() {
        System.out.println(secretKey);
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        System.out.println(secretKey);
    }

    //JWT 토큰 생성
    public TokenDto createTokenDto(Long userPk, List<String> roles, boolean maintain) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(userPk));
        claims.put(ROLES, roles);
        Date now = new Date();
        Long duration;
        if (maintain == true) {
            duration = refreshTokenLongValidMillisecond;
        } else {
            duration = refreshTokenShortValidMillisecond;
        }

        String accessToken = createToken(userPk, roles, accessTokenValidMillisecond);
        String refreshToken = createToken(userPk, roles, duration);

        return TokenDto.builder()
                .grantType("bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpireDate(duration)
                .build();
    }

    public String createToken(Long uid, List<String> roles, Long tokenValid) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(uid)); // claims 생성 및 payload 설정
        claims.put(ROLES, roles); // 권한 설정, key/ value 쌍으로 저장

        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValid))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }


    public ResponseTokenDto createResponseToken(Long userPk, List<String> roles, boolean maintain) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(userPk));
        claims.put(ROLES, roles);
        Date now = new Date();
        Long duration;
        if (maintain == true) {
            duration = refreshTokenLongValidMillisecond;
        } else {
            duration = refreshTokenShortValidMillisecond;
        }
        String accessToken = createToken(userPk,roles,accessTokenValidMillisecond);
        String refreshToken = createToken(userPk,roles,duration);

        return ResponseTokenDto.builder()
                .grantType("bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpireDate(accessTokenValidMillisecond)
                .refreshTokenExpireDate(duration)
                .build();
    }


    public Authentication getAuthentication(String token) {

        Claims claims = parseClaims(token);
        if (claims.get(ROLES) == null) {
            throw new CAuthenticationEntryPointException();
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(claims.getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());

    }


    public Claims parseClaims(String token) {
        try {

            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public Long getUserUid(String token) {
        Long result = Long.valueOf(Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject());
        return result;
    }


    // HTTP Request 의 Header에서 Token Parsing -> "X-AUTH_TOKEN: jwt"
    public String resolveAccessToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    public String resolveRefreshToken(HttpServletRequest request) {
        return request.getHeader("refresh-Token");
    }

    public boolean validateToken(String token) {
        try {
            Claims c = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();;
            return true;
        }catch(MalformedJwtException e){
            log.error(e.toString());
            return false;

        } catch (JwtException | IllegalArgumentException e) {
            log.error(e.toString());
            return false;
        } catch(Exception e){
            return false;
        }
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = parseClaims(token).getExpiration();
        return expiration.before(new Date());
    }


    public Boolean validateToken(String token, UserDetails userDetails) {
        Long long_uid = getUserUid(token);
        if (long_uid == null) return false;
        final String username = Long.toString(long_uid);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));

    }



    public Long refreshTokenTime(boolean isMaintain) {
        if (isMaintain) {
            return refreshTokenLongValidMillisecond;
        }
        return refreshTokenShortValidMillisecond;
    }

    public List<String> getRoles(Long uid) {

        Optional<User> user = userRepository.findById(uid);
        if (user.isEmpty())
            throw new UserNotFoundException();
        return user.get().getRoles();
    }


}
