package matchTeam.crewcrew.service.user;

import io.jsonwebtoken.Claims;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.config.RedisUtil;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.security.ResponseTokenDto;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.social.KakaoProfile;
import matchTeam.crewcrew.dto.social.NaverProfile;
import matchTeam.crewcrew.dto.user.*;
import matchTeam.crewcrew.dto.user.example.UserResponseDto;
import matchTeam.crewcrew.entity.security.RefreshToken;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.security.RefreshTokenJpaRepository;
import matchTeam.crewcrew.repository.user.LikedCategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.response.exception.auth.*;
import matchTeam.crewcrew.response.exception.profile.ProfileEmptyNameException;
import matchTeam.crewcrew.response.exception.profile.ProfileEmptyNickNameException;
import matchTeam.crewcrew.service.amazonS3.S3Uploader;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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
    private final EmailService emailService;
    private final S3Uploader s3Uploader;


    public User findByUid(Long id) {
        return userRepository.findByUid(id);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmailAndProvider(String email, String provider) {
        return userRepository.findByEmailAndProvider(email, provider);
    }


    public Long signup(SignUpLocalRequestDto localSignUpRequestDto) {
        if (userRepository.findByEmailAndProvider(localSignUpRequestDto.getEmail(), "local").isPresent())
            throw new CrewException(ErrorCode.USER_ALREADY_EXIST);
//            throw new CrewException(ErrorCode.EMAIL_CODE_NOT_MATCH);
        return userRepository.save(localSignUpRequestDto.toEntity(passwordEncoder)).getUid();
    }


    @Transactional(rollbackFor = Exception.class)
    public ResponseTokenDto register(String email, String password, String name, String nickName, MultipartFile file, List<Long> categoryId, String message, Integer Default) {
        System.out.println("email: " + email + "password: " + password + "name: " + name + "nickname" + "file: " + file + "categoryId" + categoryId + " Default " + Default);

        if (findByEmailAndProvider(email, "local").isPresent()) {
            throw new CrewException(ErrorCode.USER_ALREADY_EXIST);
        }


        validateDuplicateByNickname(nickName);
        likedCategoryService.validLikedCategory(categoryId);
        emailService.checkVerifiedEmail(email);
        //1004 이메일인증이 안된 이메일
        //1005 현재 입력한 이메일로 이미 존재할 경우
        validationNickName(nickName);
        validationName(name);
        validationPasswd(password);
        String email_url = email.replace("@", "_");

        String filename = s3Uploader.addImageWhenSignUp(email_url, file, Default, "local");
        log.info(filename, "파일네임 파일네임");

        List<Long> input = likedCategoryService.deleteDuplicateCategory(categoryId);
        SignUpLocalRequestDto signUpRequestDto = new SignUpLocalRequestDto(email, password, name, nickName, filename, input, message, "local");
        Long signupId = signup(signUpRequestDto);
        User user = findByUid(signupId);
        likedCategoryService.addLikedCategory(user,input);
        ResponseTokenDto tokenDto = jwtProvider.createResponseToken(user.getUid(), user.getRoles(),true);

//        UserResponseDto userResponseDto = new UserResponseDto(signupId, signUpRequestDto.getEmail(), signUpRequestDto.getName(), signUpRequestDto.getNickName(), filename, signUpRequestDto.getCategoryId(), user.getMessage(), user.getProvider());
        return tokenDto;
    }


    public ResponseTokenDto login(UserLoginRequestDto userLoginRequestDto) {
        //회원 정보 존재하는지 확인
        User user = userRepository.findByEmailAndProvider(userLoginRequestDto.getEmail(), "local").orElseThrow(() -> new CrewException(ErrorCode.EMAIL_NOT_EXIST));
//                orElseThrow(LoginFailedByEmailNotExistException::new);
        // 회원 패스워드 일치하는지 확인
        System.out.println(userLoginRequestDto.getPassword() + "  " + user.getPassword());

        if (!passwordEncoder.matches(userLoginRequestDto.getPassword(), user.getPassword()))
            throw new CrewException(ErrorCode.LOGIN_FAILED_BY_PASSWORD);

        log.info(userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword(), userLoginRequestDto.isMaintain());
        // AccessToken ,Refresh Token 발급

        Long id = user.getUid();
        System.out.println(user.getUid());
        ResponseTokenDto tokenDto = jwtProvider.createResponseToken(user.getUid(), user.getRoles(), userLoginRequestDto.isMaintain());


//        refreshTokenJpaRepository.save(refresh_Token);
        Long time = jwtProvider.refreshTokenTime(userLoginRequestDto.isMaintain());
        redisutil.setDataExpire(tokenDto.getRefreshToken(), Long.toString(id), time);

        return tokenDto;


    }

    public String profileFileName(User user) {
        String name = user.getProfileImage();
        StringBuilder sb = new StringBuilder();

        String[] array = name.split("/");
        int length = array.length;

        for (int i = length - 2; i < length; i++) {
            sb.append(array[i]);
            if (i != length - 1) {
                sb.append("/");
            }
            System.out.println(i + array[i]);
        }

        return sb.toString();
    }


    public boolean stringCheck(String str) {
        return str == null;

    }

    public boolean blankCheck(String str) {
        return str.isBlank();
    }


    public void validProfileChange(User user, String password, String name, String
            nickName, List<Long> categoryId, String message) {
        likedCategoryService.validLikedCategory(categoryId);

        if (!stringCheck(password)) {
            if (blankCheck(password)) {
                throw new CrewException(ErrorCode.PASSWORD_BLANK_EXCEPTION);
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
        if (categoryId != null && categoryId.size() != 0) {
            likedCategoryService.ChangeUsersLike(user, categoryId, usersLike);
        }
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

    public void urlToImage(String emailUrl, String imageUrl, User user) {
        String filename = s3Uploader.urlConvert(emailUrl, imageUrl, user);
        setProfileImage(user, filename);
    }

    public void likedCategory(List<Long> categoryId, User user) {
        Map<Long, Long> usersLike = likedCategoryRepository.findCidAndCparents(user);
        for (Long l : usersLike.keySet()) {
            System.out.println("-=-=-=-==-==-=-=-" + l + "==-=-=-==-=-" + usersLike.get(l));
        }
    }


    public Long kakaoSignup(UserSignUpRequestDto userSignUpRequestDto) {
        Optional<User> user = userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(), userSignUpRequestDto.getProvider());
        System.out.println(user);
        if (userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(), userSignUpRequestDto.getProvider())
                .isPresent()) throw new CrewException(ErrorCode.KAKAKO_USER_ALREADY_EXIST);
        return userRepository.save(userSignUpRequestDto.toEntity("kakao")).getUid();
    }

    public Long naverSignup(UserSignUpRequestDto userSignUpRequestDto) {
        Optional<User> user = userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(), userSignUpRequestDto.getProvider());
        System.out.println(user);
        if (userRepository.findByEmailAndProvider(userSignUpRequestDto.getEmail(), userSignUpRequestDto.getProvider())
                .isPresent()) throw new CrewException(ErrorCode.USER_ALREADY_EXIST);
        return userRepository.save(userSignUpRequestDto.toEntity("naver")).getUid();
    }


    public void validationPasswd(String pw) {
        Pattern p = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$");
        Matcher m = p.matcher(pw);

        Pattern blank = Pattern.compile("(\\s)");
        Matcher m_blank = blank.matcher(pw);

        Pattern emoji_m = Pattern.compile("[\\x{10000}-\\x{10ffff}\ud800-\udfff]");
        Matcher emoji_p = emoji_m.matcher(pw);


        if (m_blank.find()) {
            throw new CrewException(ErrorCode.PASSWORD_BLANK_EXCEPTION);
        }
        if (emoji_p.find()) {
            throw new CrewException(ErrorCode.PASSWORD_EMOJI_EXCEPTION);
        }
        if (!m.matches()) {
            throw new CrewException(ErrorCode.PASSWORD_INVALID_EXCEPTION);
        }
    }


    public void setProfileImage(User user, String image) {
        user.setProfileImage(image);
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

            throw new CrewException(ErrorCode.NICKNAME_INVALID_EXCEPTION);
        } else if (nickName.length() > 15) {
            System.out.println(nickName.length() + "에러 길어서 발생");
            throw new CrewException(ErrorCode.NICKNAME_INVALID_EXCEPTION);
        }
    }

    public void validationName(String name) {
        System.out.println("-------------길이-------" + name.length());
        if (name.length() <= 0) {
            System.out.println(name.length() + "에러 짧아서 발생");

            throw new CrewException(ErrorCode.NAME_INVALID_EXCEPTION);
        } else if (name.length() > 10) {
            System.out.println(name.length() + "에러 길어서 발생");
            throw new CrewException(ErrorCode.NAME_INVALID_EXCEPTION);
        }
    }

    public void validationMessage(String message) {
        System.out.println("-------------길이-------" + message.length());
        if (message.length() <= 0) {
            System.out.println(message.length() + "에러 짧아서 발생");

            throw new CrewException(ErrorCode.MESSAGE_INVALID_EXCEPTION);
        } else if (message.length() > 25) {
            System.out.println(message.length() + "에러 길어서 발생");
            throw new CrewException(ErrorCode.MESSAGE_INVALID_EXCEPTION);
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
            throw new CrewException(ErrorCode.USERNAME_ALREADY_EXIST);
        }
    }


    public User tokenChecker(String accessToken) {
        if (accessToken == null || blankCheck(accessToken)) {
            return null;
        }
        if (!jwtProvider.validateToken(accessToken)) {
            log.error("사용할수 없는 토큰입니다.");
            return null;
        }
        Claims c = jwtProvider.parseClaims(accessToken);
        String uid = c.getSubject();
        if (uid == null || uid.equals("null")) {
            return null;
        }

        System.out.println("Claims=  " + c + "  uid= " + uid);

        if (userRepository.findById(Long.valueOf(uid)).isEmpty()) {
            throw new CrewException(ErrorCode.UID_NOT_EXIST);
        }
        User user = userRepository.findByUid(Long.valueOf(uid));


        return user;
    }

    @Transactional(rollbackFor = Exception.class)
    public void profileEdit(ProfileChangeRequestDto profileChangeRequestDto, User user, MultipartFile file) {
        String password = profileChangeRequestDto.getPassword();
        String nickName = profileChangeRequestDto.getNickName();
        String name = profileChangeRequestDto.getName();
        List<Long> categoryId = profileChangeRequestDto.getCategoryId();
        String message = profileChangeRequestDto.getMessage();
        if (categoryId == null) {
            categoryId = new ArrayList<Long>();
        }

        if (file != null && !file.isEmpty()) {
            String previous = profileFileName(user);
            s3Uploader.deleteS3(previous);

            String tempName = s3Uploader.nameFile(user.getEmail(), user.getProvider());
            String filename = null;
            try {
                filename = s3Uploader.upload(file, tempName);
            } catch (IOException e) {
                e.printStackTrace();
            }
            setProfileImage(user, filename);
        }
        validProfileChange(user, password, name, nickName, categoryId, message);
        profileChange(user, password, name, nickName, categoryId, message);


    }
    @Transactional(rollbackFor = Exception.class)
    public User kakaoRegister(KakaoProfile kakaoProfile) {
        String nickName = nickNameGenerator(kakaoProfile.getProperties().getNickname());
        Long userId = kakaoSignup(UserSignUpRequestDto.builder()
                .email(kakaoProfile.getKakao_account().getEmail())
                .name(kakaoProfile.getProperties().getNickname())
                .nickName(nickName)
                .provider("kakao")
                .build());
        User user = findByUid(userId);
        if (kakaoProfile.getKakao_account().getProfile().is_default_image()==true){
            String file = s3Uploader.setDefaultImage(user.getEmail(),user.getProvider());
            setProfileImage(user,file);
        }else{
            String email_url = s3Uploader.nameFile(kakaoProfile.getKakao_account().getEmail(), "kakao");
            String file =s3Uploader.urlConvert(email_url, kakaoProfile.getKakao_account().getProfile().getProfile_image_url(), user);
            setProfileImage(user,file);
        }
        ArrayList<Long> Default = new ArrayList<>(Arrays.asList(7L,14L));
        likedCategoryService.addLikedCategory(user,Default);
        setRandomMessage(user);

        return user;
    }

    @Transactional(rollbackFor = Exception.class)
    public User naverRegister(NaverProfile naverProfile) {
        String nickName = nickNameGenerator(naverProfile.getResponse().getName());
        Long userId = naverSignup(UserSignUpRequestDto.builder()
                .email(naverProfile.getResponse().getEmail())
                .name(naverProfile.getResponse().getName())
                .nickName(nickName)
                .provider("naver")
                .build());
        User user = findByUid(userId);
//        https://ssl.pstatic.net/static/pwe/address/img_profile.png


//        System.out.println("==네이버에서 보낸 프로필 이미지=="+naverProfile.getResponse().getProfile_image());
//        System.out.println("https://ssl.pstatic.net/static/pwe/address/img_profile.png");
//        System.out.println(naverProfile.getResponse().getProfile_image().equals("https://ssl.pstatic.net/static/pwe/address/img_profile.png"));

        if (naverProfile.getResponse().getProfile_image().equals("https://ssl.pstatic.net/static/pwe/address/img_profile.png")==true){

            String file =s3Uploader.setDefaultImage(user.getEmail(),user.getProvider());
            setProfileImage(user,file);
        }else{
            String email_url = s3Uploader.nameFile(naverProfile.getResponse().getEmail(), "naver");
            urlToImage(email_url, naverProfile.getResponse().getProfile_image(), user);

        }
        ArrayList<Long> Default = new ArrayList<>(Arrays.asList(7L,14L));
        likedCategoryService.addLikedCategory(user,Default);
        setRandomMessage(user);
        return user;
    }

}
