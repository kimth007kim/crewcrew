package matchTeam.crewcrew.service.user;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.user.LocalSignUpRequestDto;
import matchTeam.crewcrew.dto.user.UserLoginRequestDto;
import matchTeam.crewcrew.dto.user.UserSignUpRequestDto;
import matchTeam.crewcrew.entity.security.RefreshToken;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.security.RefreshTokenJpaRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.auth.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    //email 발송기능
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenJpaRepository refreshTokenJpaRepository;
    private final JwtProvider jwtProvider;


    public User findByUid(Long id) {
        return userRepository.findByUid(id);
    }
    public Optional<User> findByEmailAndProvider(String email, String provider) {
        return userRepository.findByEmailAndProvider(email, provider);
    }

    public Long signup(LocalSignUpRequestDto localSignUpRequestDto) {
        if (userRepository.findByEmailAndProvider(localSignUpRequestDto.getEmail(),"local").isPresent())
            throw new EmailSignUpFailedCException();
        return userRepository.save(localSignUpRequestDto.toEntity(passwordEncoder)).getUid();
    }


    public TokenDto login(UserLoginRequestDto userLoginRequestDto) {
        //회원 정보 존재하는지 확인
        User user = userRepository.findByEmailAndProvider(userLoginRequestDto.getEmail(),"local").
                orElseThrow(LoginFailedByEmailNotExistException::new);
        // 회원 패스워드 일치하는지 확인
        System.out.println(userLoginRequestDto.getPassword() + "  " + user.getPassword());

        if (!passwordEncoder.matches(userLoginRequestDto.getPassword(), user.getPassword()))
            throw new LoginFailedByPasswordException();

        log.info(userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword());
        // AccessToken ,Refresh Token 발급
        TokenDto tokenDto = jwtProvider.createTokenDto(user.getUid(), user.getRoles());

        // RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .pkey(user.getUid())
                .token(tokenDto.getRefreshToken())
                .build();
        refreshTokenJpaRepository.save(refreshToken);
        return tokenDto;
    }

    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        if (!jwtProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new CRefreshTokenException();
            //1901 리프레시토큰이 유효하지않습니다.
        }

        //AccessToken 에서 UserPk가져오기
        String accessToken = tokenRequestDto.getAccessToken();
        Authentication authentication = jwtProvider.getAuthentication(accessToken);


        //userPk로 user검색 /repo에 저장된 refreshtoken이 없음
        User user = userRepository.findById(Long.parseLong(authentication.getName()))
                .orElseThrow(CUserNotFoundException::new);
        //1902 토큰의 pk로 유저를 찾을수 없습니다.
        RefreshToken refreshToken = refreshTokenJpaRepository.findByPkey(user.getUid())
                .orElseThrow(CRefreshTokenNotExistInDBException::new);
        //1903 DB에 해당 Refresh 토큰이 존재하지않습니다.

        // 리프레시 토큰 불일치 에러
        if (!refreshToken.getToken().equals(tokenRequestDto.getRefreshToken()))
            throw new CRefreshTokenNotMatchWithInputException();
        //입력받은 Refresh 토큰이 DB에 저장된 Refresh 토큰과 다릅니다.

        //AccessToken , refreshToken 토큰 재발급 ,리프레시 토큰 저장
        TokenDto newCreatedToken = jwtProvider.createTokenDto(user.getUid(), user.getRoles());
        RefreshToken updateRefreshToken = refreshToken.updateToken(newCreatedToken.getRefreshToken());
        refreshTokenJpaRepository.save(updateRefreshToken);

        return newCreatedToken;
    }
    public Long kakaoSignup(UserSignUpRequestDto userSignUpRequestDto){
        Optional<User> user=userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(),userSignUpRequestDto.getProvider());
        System.out.println(user);
        if (userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(),userSignUpRequestDto.getProvider())
                .isPresent()) throw new CKakaoUserAlreadyExistException();
        return userRepository.save(userSignUpRequestDto.toEntity("kakao")).getUid();
    }
    public Long naverSignup(UserSignUpRequestDto userSignUpRequestDto){
        Optional<User> user=userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(),userSignUpRequestDto.getProvider());
        System.out.println(user);
        if (userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(),userSignUpRequestDto.getProvider())
                .isPresent()) throw new CUserAlreadyExistException();
        return userRepository.save(userSignUpRequestDto.toEntity("naver")).getUid();
    }

    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

//    public boolean validateDuplicateMember(String email) {
//        if (userRepository.findByEmail(email).isEmpty()) {
//            return true;
//        } else {
//            return false;
//        }
//    }

    public User tokenChecker(String accessToken){
        if(!jwtProvider.validateToken(accessToken)){
            throw new CInvalidTokenException();
        }
        Claims c = jwtProvider.parseClaims(accessToken);
        String uid =c.getSubject();
        System.out.println("Claims=  "+c+"  uid= "+uid);
        User user = userRepository.findByUid(Long.valueOf(uid));

        return user;
    }


}
