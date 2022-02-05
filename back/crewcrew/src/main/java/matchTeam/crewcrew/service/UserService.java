package matchTeam.crewcrew.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.user.LocalSignUpRequestDto;
import matchTeam.crewcrew.dto.user.UserLoginRequestDto;
import matchTeam.crewcrew.dto.user.UserLoginResponseDto;
import matchTeam.crewcrew.dto.user.UserSignUpRequestDto;
import matchTeam.crewcrew.entity.ConfirmationToken;
import matchTeam.crewcrew.entity.security.RefreshToken;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.security.RefreshTokenJpaRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.*;
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
    private final ConfirmationTokenService confirmationTokenService;
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
        if (userRepository.findByEmail(localSignUpRequestDto.getEmail()).isPresent())
            throw new EmailSignUpFailedCException();
        return userRepository.save(localSignUpRequestDto.toEntity(passwordEncoder)).getUid();
    }


    public TokenDto login(UserLoginRequestDto userLoginRequestDto) {
        //회원 정보 존재하는지 확인
        User user = userRepository.findByEmail(userLoginRequestDto.getEmail()).
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
        }

        //AccessToken 에서 UserPk가져오기
        String accessToken = tokenRequestDto.getAccessToken();
        Authentication authentication = jwtProvider.getAuthentication(accessToken);


        //userPk로 user검색 /repo에 저장된 refreshtoken이 없음
        User user = userRepository.findById(Long.parseLong(authentication.getName()))
                .orElseThrow(CUserNotFoundException::new);
        RefreshToken refreshToken = refreshTokenJpaRepository.findByPkey(user.getUid())
                .orElseThrow(CRefreshTokenException::new);

        // 리프레시 토큰 불일치 에러
        if (!refreshToken.getToken().equals(tokenRequestDto.getRefreshToken()))
            throw new CRefreshTokenException();

        //AccessToken , refreshToken 토큰 재발급 ,리프레시 토큰 저장
        TokenDto newCreatedToken = jwtProvider.createTokenDto(user.getUid(), user.getRoles());
        RefreshToken updateRefreshToken = refreshToken.updateToken(newCreatedToken.getRefreshToken());
        refreshTokenJpaRepository.save(updateRefreshToken);

        return newCreatedToken;
    }
    public Long kakaoSignup(UserSignUpRequestDto userSignUpRequestDto){
        if (userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(),userSignUpRequestDto.getProvider())
                .isPresent()) throw new CUserNotFoundException();
        return userRepository.save(userSignUpRequestDto.toEntity()).getUid();
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

    public void confirmEmail(String token) {
        ConfirmationToken findConfirmationToken = confirmationTokenService.findByIdAndExpirationDateAfterAndExpired(token);
//        User user = findByEmail(findConfirmationToken.getEmail());
        findConfirmationToken.useToken();

    }


}
