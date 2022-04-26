package matchTeam.crewcrew.service.user;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.user.SignUpRequestDto;
import matchTeam.crewcrew.dto.user.UserLoginRequestDto;
import matchTeam.crewcrew.dto.user.UserMessage;
import matchTeam.crewcrew.dto.user.UserSignUpRequestDto;
import matchTeam.crewcrew.dto.user.example.UserResponseDto;
import matchTeam.crewcrew.entity.security.RefreshToken;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.security.RefreshTokenJpaRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.auth.*;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    //email 발송기능
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenJpaRepository refreshTokenJpaRepository;
    private final LikedCategoryService likedCategoryService;
    private final JwtProvider jwtProvider;


    public User findByUid(Long id) {
        return userRepository.findByUid(id);
    }
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmailAndProvider(String email, String provider) {
        return userRepository.findByEmailAndProvider(email, provider);
    }

    public Long signup(SignUpRequestDto localSignUpRequestDto) {
        if (userRepository.findByEmailAndProvider(localSignUpRequestDto.getEmail(), "local").isPresent())
            throw new EmailSignUpFailedCException();
        return userRepository.save(localSignUpRequestDto.toEntity(passwordEncoder)).getUid();
    }


    public TokenDto login(UserLoginRequestDto userLoginRequestDto) {
        //회원 정보 존재하는지 확인
        User user = userRepository.findByEmailAndProvider(userLoginRequestDto.getEmail(), "local").
                orElseThrow(LoginFailedByEmailNotExistException::new);
        // 회원 패스워드 일치하는지 확인
        System.out.println(userLoginRequestDto.getPassword() + "  " + user.getPassword());

        if (!passwordEncoder.matches(userLoginRequestDto.getPassword(), user.getPassword()))
            throw new LoginFailedByPasswordException();

        log.info(userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword(), userLoginRequestDto.isMaintain());
        // AccessToken ,Refresh Token 발급

        Long id = user.getUid();
        System.out.println(user.getUid());
//        if (jwtProvider.validateToken()==True)
        Optional<RefreshToken> refreshToken = refreshTokenJpaRepository.findByPkey(id);
        System.out.println(refreshToken);
        boolean maintain = userLoginRequestDto.isMaintain();
        if (refreshToken.isPresent() && (jwtProvider.validateToken(refreshToken.get().getToken()) == true)) {
            TokenDto newCreatedToken = jwtProvider.createTokenDto(user.getUid(), user.getRoles(), maintain);
            RefreshToken updateRefreshToken = refreshToken.get().updateToken(newCreatedToken.getRefreshToken());
            refreshTokenJpaRepository.save(updateRefreshToken);
            return newCreatedToken;
        }

//       1. Refresh 토큰이 존재하면 그걸 토대로 access토큰 발급

//        2. Refresh 토큰 없으면 새로 Refresh토큰 발급후 그걸 토대로 accesss토큰 발급

//        TokenDto tokenDto = jwtProvider.createTokenDto(user.getUid(), user.getRoles(),maintain);
        TokenDto tokenDto = jwtProvider.createTokenDto(user.getUid(), user.getRoles(), userLoginRequestDto.isMaintain());

        // RefreshToken 저장
        RefreshToken refresh_Token = RefreshToken.builder()
                .pkey(user.getUid())
                .token(tokenDto.getRefreshToken())
                .build();
        refreshTokenJpaRepository.save(refresh_Token);
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
        TokenDto newCreatedToken = jwtProvider.createTokenDto(user.getUid(), user.getRoles(), false);
        RefreshToken updateRefreshToken = refreshToken.updateToken(newCreatedToken.getRefreshToken());
        refreshTokenJpaRepository.save(updateRefreshToken);

        return newCreatedToken;
    }
    public boolean stringCheck(String str){
        return str == null || str.isBlank();

    }

    public void profileChange(User user, String password, String name, String nickName, List<Long> categoryId, String message){

        if (categoryId!=null){
            System.out.println("--------------- 카테고리 id있음");
            List<Long> usersLike = likedCategoryService.findUsersLike(user);
//        List<Long> result =likedCategoryService.addLikedCategory(user,input,usersLike);

            List<Long> input = likedCategoryService.deleteDuplicateCategory(categoryId);
            List<Long> result = likedCategoryService.addLikedCategory(user, input);
        }
        if (!stringCheck(password)){
            validationPasswd(password);
            changePassword(user,password);
        }

        if (!stringCheck(nickName)){
            validateDuplicateByNickname(nickName);
            user.setNickname(nickName);
        }
        if (!stringCheck(name)) {
            user.setNickname(name);
        }

    }

    public Long kakaoSignup(UserSignUpRequestDto userSignUpRequestDto) {
        Optional<User> user = userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(), userSignUpRequestDto.getProvider());
        System.out.println(user);
        if (userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(), userSignUpRequestDto.getProvider())
                .isPresent()) throw new CKakaoUserAlreadyExistException();
        return userRepository.save(userSignUpRequestDto.toEntity("kakao")).getUid();
    }

    public Long naverSignup(UserSignUpRequestDto userSignUpRequestDto) {
        Optional<User> user = userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(), userSignUpRequestDto.getProvider());
        System.out.println(user);
        if (userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(), userSignUpRequestDto.getProvider())
                .isPresent()) throw new CUserAlreadyExistException();
        return userRepository.save(userSignUpRequestDto.toEntity("naver")).getUid();
    }

//    public void passwordCheck(User user, String previous) {
//        System.out.println("---------         " + previous + "     ------------ " + user.getPassword());
//        if (!passwordEncoder.matches(previous, user.getPassword())) {
//            throw new CPasswordNotMatchException();
//        }
//    }

    public void validationPasswd(String pw){
        Pattern p = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$");
        Matcher m = p.matcher(pw);

        Pattern blank = Pattern.compile("(\\s)");
        Matcher m_blank =blank.matcher(pw);

        Pattern emoji_m=Pattern.compile("[\\x{10000}-\\x{10ffff}\ud800-\udfff]");
        Matcher emoji_p = emoji_m.matcher(pw);


        if(m_blank.find()){
           throw new PasswordBlankException();
        }
        if (emoji_p.find()) {
           throw new PasswordEmojiException();
        }
        if (!m.matches()){
            throw new PasswordInvalidException();
        }
    }





    
    public void setProfileImage(User user, String image) {
        user.setProfileImage(image);
    }

    public void setMessage(User user, String message) {
        user.setMessage(message);
    }

    public void changePassword(User user, String password) {
        String new_password = passwordEncoder.encode(password);
        user.setPassword(new_password);
    }

    public void setRandomMessage(User user) {
        StringBuilder sb = new StringBuilder();
        sb.append("M");
        int random = (int) ((Math.random() * 5));
        sb.append(random);
        String message = UserMessage.valueOf(sb.toString()).getMessage();
        user.setMessage(message);

    }

    public String nickNameGenerator(String nickName) {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 6;
        Random random = new Random();
        while (true) {
            String generated = random.ints(leftLimit, rightLimit + 1)
                    .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                    .limit(targetStringLength)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString();

            StringBuilder sb = new StringBuilder();
            sb.append(nickName);
            sb.append("#");
            sb.append(generated);
            if (userRepository.findByNickname(sb.toString()).isEmpty()) {
                return sb.toString();
            }

        }


    }

    public List<UserResponseDto> findUsers() {
        List<User> result = userRepository.findAll();
        int length = result.size();
        List<UserResponseDto> users = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            User user = result.get(i);
//            System.out.println("ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅋㅎ------------------------"+user.getUid());
            UserResponseDto userResponseDto = new UserResponseDto(user.getUid(), user.getEmail(), user.getName(), user.getNickname(), user.getProfileImage(), likedCategoryService.findUsersLike(user), user.getMessage(),user.getProvider());
            users.add(userResponseDto);
        }
        return users;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public void validateDuplicateByNickname(String nickname) {
        if (!userRepository.findByNickname(nickname).isEmpty()) {
            throw new NickNameAlreadyExistException();
        }
    }


    public User tokenChecker(String accessToken) {
        if (!jwtProvider.validateToken(accessToken)) {
            throw new CInvalidTokenException();
        }
        Claims c = jwtProvider.parseClaims(accessToken);
        String uid = c.getSubject();
        System.out.println("Claims=  " + c + "  uid= " + uid);
        if (userRepository.findById(Long.valueOf(uid)).isEmpty()){
            throw new UidNotExistException();
        }
        User user = userRepository.findByUid(Long.valueOf(uid));


        return user;
    }


}
