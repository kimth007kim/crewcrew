package matchTeam.crewcrew.service.user;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.config.RedisUtil;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.ResponseTokenDto;
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
import matchTeam.crewcrew.repository.user.LikedCategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.auth.*;
import matchTeam.crewcrew.response.exception.profile.ProfileEmptyNameException;
import matchTeam.crewcrew.response.exception.profile.ProfileEmptyNickNameException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final LikedCategoryRepository likedCategoryRepository;
    //email 발송기능
    private final PasswordEncoder passwordEncoder;
    private final CookieService cookieService;
    private final RedisUtil redisutil;
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
//            throw new CrewException(ErrorCode.EMAIL_CODE_NOT_MATCH);
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
//        if (refreshToken.isPresent() && (jwtProvider.validateToken(request,refreshToken.get().getToken()) == true)) {
//            TokenDto newCreatedToken = jwtProvider.createTokenDto(user.getUid(), user.getRoles(), maintain);
//            refreshTokenJpaRepository.deleteByPkey(refreshToken.get().getPkey());
//        }
        //       1. Refresh 토큰이 존재하면 그걸 토대로 access토큰 발급
        //        2. Refresh 토큰 없으면 새로 Refresh토큰 발급후 그걸 토대로 accesss토큰 발급
        //        TokenDto tokenDto = jwtProvider.createTokenDto(user.getUid(), user.getRoles(),maintain);
        TokenDto tokenDto = jwtProvider.createTokenDto(user.getUid(), user.getRoles(), userLoginRequestDto.isMaintain());

        // RefreshToken 저장
        RefreshToken refresh_Token = RefreshToken.builder()
                .pkey(user.getUid())
                .token(tokenDto.getRefreshToken())
                .build();
//        refreshTokenJpaRepository.save(refresh_Token);
        return tokenDto;


    }

    public ResponseTokenDto redisLogin(UserLoginRequestDto userLoginRequestDto) {
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
        ResponseTokenDto tokenDto = jwtProvider.createResponseToken(user.getUid(), user.getRoles(), userLoginRequestDto.isMaintain());

        // RefreshToken 저장
        RefreshToken refresh_Token = RefreshToken.builder()
                .pkey(user.getUid())
                .token(tokenDto.getRefreshToken())
                .build();


//        refreshTokenJpaRepository.save(refresh_Token);
        Long time = jwtProvider.refreshTokenTime(userLoginRequestDto.isMaintain());
        redisutil.setDataExpire(refresh_Token.getToken(), Long.toString(id), time);

        return tokenDto;


    }


    public boolean stringCheck(String str) {
        return str == null;

    }

    public boolean blankCheck(String str) {
        return str.isBlank();
    }


    public void validProfileChange(User user, String password, String name, String
            nickName, List<Long> categoryId, String message) {


//            if (categoryId == null || categoryId.size() == 0) {
//                throw new ProfileEmptyCategoryException();
//            }
//        List<Long> usersLike = likedCategoryService.findUsersLike(user);
//        likedCategoryService.ChangeUsersLike(user, categoryId, usersLike);

        if (!stringCheck(password)) {
            if (blankCheck(password)) {
                throw new PasswordBlankException();
            }
            validationPasswd(password);
//            changePassword(user, password);
        }
//
        if (!stringCheck(nickName)) {
            if (blankCheck(nickName)) {
                throw new ProfileEmptyNickNameException();
            }
            validationNickName(nickName);
            validateDuplicateByNickname(nickName);
//            user.setNickname(nickName);
        }

        if (!stringCheck(name)) {
            if (blankCheck(name)) {
                throw new ProfileEmptyNameException();
            }
            validationName(name);
//            user.setName(name);
        }
        if (!stringCheck(message)) {
            if (blankCheck(message)) {
                throw new ProfileEmptyNameException();
            }
            validationMessage(message);
//            user.setMessage(message);
        }
        System.out.println(password);
        System.out.println(nickName);
        System.out.println(name);
        System.out.println(message);

    }

    public void profileChange(User user, String password, String name, String
            nickName, List<Long> categoryId, String message) {
        List<Long> usersLike = likedCategoryService.findUsersLike(user);
        likedCategoryService.ChangeUsersLike(user, categoryId, usersLike);
        if (!stringCheck(password)) {
            changePassword(user, password);
        }
        if (!stringCheck(name)) {
            user.setName(name);
        }
        if (!stringCheck(nickName)) {
            user.setNickname(nickName);
        }
        if (!stringCheck(nickName)) {
            user.setNickname(nickName);
        }
        if (!stringCheck(message)) {
            user.setMessage(message);
        }
    }

    public void likedCategory(List<Long> categoryId, User user) {
        Map<Long, Long> usersLike = likedCategoryRepository.findCidAndCparents(user);
        for (Long l : usersLike.keySet()) {
            System.out.println("-=-=-=-==-==-=-=-" + l + "==-=-=-==-=-" + usersLike.get(l));
        }


        //        System.out.println(user)

        //        likedCategoryService.ChangeUsersLike(user, categoryId, usersLike);
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

    public void validationPasswd(String pw) {
        Pattern p = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$");
        Matcher m = p.matcher(pw);

        Pattern blank = Pattern.compile("(\\s)");
        Matcher m_blank = blank.matcher(pw);

        Pattern emoji_m = Pattern.compile("[\\x{10000}-\\x{10ffff}\ud800-\udfff]");
        Matcher emoji_p = emoji_m.matcher(pw);


        if (m_blank.find()) {
            throw new PasswordBlankException();
        }
        if (emoji_p.find()) {
            throw new PasswordEmojiException();
        }
        if (!m.matches()) {
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

    public void validationNickName(String nickName) {

        System.out.println("-------------길이-------" + nickName.length());
        System.out.println(nickName);
        if (nickName.length() <= 0) {
            System.out.println(nickName.length() + "에러 짧아서 발생");

            throw new NickNameInvalidException();
        } else if (nickName.length() > 15) {
            System.out.println(nickName.length() + "에러 길어서 발생");
            throw new NickNameInvalidException();
        }
    }

    public void validationName(String name) {
        System.out.println("-------------길이-------" + name.length());
        if (name.length() <= 0) {
            System.out.println(name.length() + "에러 짧아서 발생");

            throw new NameInvalidException();
        } else if (name.length() > 10) {
            System.out.println(name.length() + "에러 길어서 발생");
            throw new NameInvalidException();
        }
    }

    public void validationMessage(String message) {
        System.out.println("-------------길이-------" + message.length());
        if (message.length() <= 0) {
            System.out.println(message.length() + "에러 짧아서 발생");

            throw new MessageInvalidException();
        } else if (message.length() > 25) {
            System.out.println(message.length() + "에러 길어서 발생");
            throw new MessageInvalidException();
        }
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
            UserResponseDto userResponseDto = new UserResponseDto(user.getUid(), user.getEmail(), user.getName(), user.getNickname(), user.getProfileImage(), likedCategoryService.findUsersLike(user), user.getMessage(), user.getProvider());
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

//    public boolean validateToken(String token){
//        if(!jwtProvider.validateToken(token)){
//            return false;
//        }
//        return true;
//    }

    public User tokenChecker(String accessToken) {
        if (accessToken== null || blankCheck(accessToken)){
            return null;
        }
        if (!jwtProvider.validateToken(accessToken)) {
            log.error("사용할수 없는 토큰입니다.");
            return null;
        }
        Claims c = jwtProvider.parseClaims(accessToken);
        String uid = c.getSubject();

        System.out.println("Claims=  " + c + "  uid= " + uid);

        if (userRepository.findById(Long.valueOf(uid)).isEmpty()) {
            throw new UidNotExistException();
        }
        User user = userRepository.findByUid(Long.valueOf(uid));


        return user;
    }



    public void reissue(HttpServletRequest request , HttpServletResponse response) {
        Cookie accessToken =cookieService.getCookie(request,"X-AUTH-TOKEN");
        Cookie refreshToken =cookieService.getCookie(request,"refreshToken");
        String jwt = null;
        String refreshjwt= null;
        String refreshUname =null;
        if (accessToken!=null)  jwt= accessToken.getValue();
        if (refreshToken!=null) refreshjwt= refreshToken.getValue();


        if (jwtProvider.validateToken(jwt) && jwtProvider.isTokenExpired(jwt)){
            return;
        }else{
            if (refreshToken!=null && jwtProvider.isTokenExpired(refreshjwt)){
                if (jwtProvider.validateToken(refreshjwt)){
                    refreshUname = redisutil.getData(refreshjwt);
                    if (refreshUname.equals(Long.toString(jwtProvider.getUserUid(refreshjwt)))) {
                        log.info("--------------------Redis 에 존재 한다.-----------");

                        Authentication authentication= jwtProvider.getAuthentication(refreshjwt);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        User user = userRepository.findByUid(Long.parseLong(refreshUname));
                        String newToken = jwtProvider.createToken(user.getUid(), user.getRoles(), jwtProvider.accessTokenValidMillisecond);
                        log.info("--------------------새로운 토큰 발급-----------"+newToken);

                        Cookie newCookie = cookieService.generateXAuthCookie("X-AUTH-TOKEN", newToken, 60 * 60 * 1000L);
                        response.addCookie(newCookie);
                        return;
                    }


                }

            }

        }
        return;
    }

}
