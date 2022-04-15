package matchTeam.crewcrew.controller.api.v1.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.dto.social.*;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.user.*;
import matchTeam.crewcrew.dto.user.example.EmailSendDto;
import matchTeam.crewcrew.dto.user.example.UserResponseDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.auth.*;
import matchTeam.crewcrew.service.amazonS3.S3Uploader;
import matchTeam.crewcrew.service.user.*;
import org.springframework.http.*;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;


@Api(tags = "1. Auth")
@RequiredArgsConstructor
@RestController
//@RequestMapping("/api/v1/auth/")
@RequestMapping("/auth")
public class AuthController {


    private final UserService userService;
    private final EmailService emailService;
    private final LikedCategoryService likedCategoryService;
    private final S3Uploader s3Uploader;


    @ApiOperation(value = "이메일 인증코드 발송", notes = "1. 유효한 이메일 인지 확인합니다.\n " +
            "2. 이미 같은 이메일로 가입되어있는지 확인합니다\n" +
            "3. 1,2번 조건을 만족했다면 해당 메일로 인증코드를 보냅니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "인증번호 발송 성공"
                    , response = EmailSendDto.class
            )
            , @ApiResponse(
            code = 1001
            , message = "이메일 형식이 유효하지않습니다."
    )
            , @ApiResponse(
            code = 1002
            , message = "이미 존재하는 유저입니다."
    )
    })
    @PostMapping("/email/send")
    public ResponseEntity<Object> SendEmail(@RequestBody UserEmailCodeDto userEmailCodeDto) throws MessagingException {
        //email 주소 형식 에  맞는지 확인하는 메서드
        String email = userEmailCodeDto.getEmail();
        if (emailService.isValidEmailAddress(email) == false) {
            throw new CNotValidEmailException();
//            1001 이메일이 유효하지 않다.
        }

        //이미 가입되었는지 확인하는 메서드
        if (userService.findByEmailAndProvider(email, "local").isPresent()) {
            throw new CUserAlreadyExistException();
//            1002 이미 존재하는 유저이다.
        }
        // 이메일 전송하는메서드
        String code = emailService.sendVerifyCode(email);

        return ResponseHandler.generateResponse("인증번호 발송 성공", HttpStatus.OK, null);
    }


    @ApiOperation(value = "UID로 유저 정보 조회하기", notes = "uid 로 유저의 정보를 찾아봅니다")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "유저 정보 찾기완료"
                    , response = UserResponseDto.class
            )
            , @ApiResponse(
            code = 1008
            , message = "존재하지 않는 id 값입니다."
    )
    })
    @GetMapping("/uid/{id}")
    public ResponseEntity<Object> findByUid(@PathVariable Long id) {
        //email 주소 형식 에  맞는지 확인하는 메서드
        User user = userService.findByUid(id);
        if (user == null) {
            throw new UidNotExistException();
        }
        UserResponseDto userResponseDto = new UserResponseDto(id, user.getEmail(), user.getName(), user.getNickname(), user.getProfileImage(), likedCategoryService.findUsersLike(user), user.getMessage());

        return ResponseHandler.generateResponse("유저 조회 성공", HttpStatus.OK, userResponseDto);
    }


    @ApiOperation(value = "이메일 인증코드 유효성 검사", notes = "이메일로 발송한 인증코드와 사용자가 입력한 인증코드가 맞는지 확인합니다.")
    @PostMapping("/email/verify")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "인증번호 인증 성공"
            )
            , @ApiResponse(
            code = 1003
            , message = "발급된 인증 코드가 이메일과 다릅니다."
    )
    })
    public ResponseEntity<Object> CodeVerify(@RequestBody UserEmailVerifyDto userEmailVerifyDto) {
        emailService.getUserIdByCode(userEmailVerifyDto.getCode(), userEmailVerifyDto.getEmail());
        //1003 발급된 인증 코드가 이메일과 일치하지않는다.
//        System.out.println(code);
        return ResponseHandler.generateResponse("인증번호 인증 성공", HttpStatus.OK, null);
    }


    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "이메일 회원가입", notes = "이메일로 회원가입을 합니다. \n" + "1. 프로필 이미지로 가입시  file=Multipartfile, default 는 사용하지않습니다. \n" + "2. 기본이미지로 회원가입시  file을 사용하지않고 default =1~5  를 사용합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "회원가입 성공"
                    , response = UserResponseDto.class
            )
            , @ApiResponse(
            code = 1004
            , message = "이메일 인증이 되지않은 이메일 주소입니다."
    )
            , @ApiResponse(
            code = 1005
            , message = "현재 입력한 이메일을 가진 유저가 이미 존재합니다. "
    )
            , @ApiResponse(
            code = 1007
            , message = "이미 존재하는 닉네임 입니다. "
    )
    })


    public ResponseEntity<Object> signUp(
            @ApiParam(value = "email 주소", required = true)
            @RequestParam String email,
            @ApiParam(value = "비밀번호", required = true)
            @RequestParam String password,
            @ApiParam(value = "회원 이름", required = true)
            @RequestParam String name,
            @ApiParam(value = "회원 닉네임", required = true)
            @RequestParam String nickName,
            @ApiParam(value = "프로필 이미지")
            @RequestParam(required = false) MultipartFile file,
            @ApiParam(value = "회원이 좋아하는 카테고리 ID", required = true)
            @RequestParam List<Long> categoryId,
            @ApiParam(value = "한줄 메세지")
            @RequestParam(required = false) String message,
            @ApiParam(value = "디폴트 이미지 선택")
            @RequestParam(required = false) Integer Default) {
//                 String email,  String password, String name, String nickName, MultipartFile file, List<Long> categoryId) {
//                @ModelAttribute SignUpRequestDto signUpRequestDto) {
        SignUpRequestDto signUpRequestDto = new SignUpRequestDto(email, password, name, nickName, file, categoryId);
        System.out.println("email: " + email + "password: " + password + "name: " + name + "nickname" + "file: " + file + "categoryId" + categoryId);

        userService.validateDuplicateByNickname(nickName);
        System.out.println(signUpRequestDto.getEmail());
        emailService.checkVerifiedEmail(signUpRequestDto.getEmail());
        //1004 이메일인증이 안된 이메일
        Long signupId = userService.signup(signUpRequestDto);
        //1005 현재 입력한 이메일로 이미 존재할 경우

        String email_url = email.replace("@", "_");


        String filename = s3Uploader.addImageWhenSignUp(email_url, file, Default);
        User user = userService.findByUid(signupId);
        user.setProfileImage(filename);
        user.setMessage(message);


//        if (StringUtils.isEmpty(message)) {
//            System.out.println("message 가 비어있음");
//        }

//        User user= userService.findByEmailAndProvider(likedCategoryDto.getEmail(),likedCategoryDto.getProvider()).orElseThrow(LoginFailedByEmailNotExistException::new);
//        List<Long> input=likedCategoryService.deleteDuplicateCategory(likedCategoryDto.getCategoryId());
        List<Long> usersLike = likedCategoryService.findUsersLike(user);
//        List<Long> result =likedCategoryService.addLikedCategory(user,input,usersLike);

        List<Long> input = likedCategoryService.deleteDuplicateCategory(signUpRequestDto.getCategoryId());
        System.out.println("중복을 제거한 카테고리" + input);
        List<Long> result = likedCategoryService.addLikedCategory(user, input);
        System.out.println("유저가 등록한 후의 카테고리" + result);

        UserResponseDto userResponseDto = new UserResponseDto(signupId, signUpRequestDto.getEmail(), signUpRequestDto.getName(), signUpRequestDto.getNickName(), filename, result, user.getMessage());

        return ResponseHandler.generateResponse("회원가입 성공", HttpStatus.OK, userResponseDto);
    }

    @GetMapping("/user/nickname/{nickName}")
    @ApiOperation(value = "닉네임 중복 체크", notes = "닉네임이 중복인지 체크한다. 사용가능하면 True를 반환하고 사용이 불가능하면 False를 반환한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "닉네임 중복 확인 성공"
                    , response = boolean.class
            )
            , @ApiResponse(
            code = 1007
            , message = "이미 존재하는 닉네임 입니다."
    )

    })
    public ResponseEntity<Object> checkNickName(@PathVariable String nickName) {
        userService.validateDuplicateByNickname(nickName);
        return ResponseHandler.generateResponse("닉네임 중복 확인 성공", HttpStatus.OK, true);
    }


//    @PostMapping("/user/changeProfileImage")
//    @ApiOperation(value ="프로필 이미지 변경" ,notes="이미지를 입력받아서 s3에 등록하고 db에 그 url을 저장합니다.")
//    public ResponseEntity<Object> changeProfileImage( @RequestParam MultipartFile files,String email,String provider) throws IOException {
//        User user=userService.findByEmailAndProvider(email,"local").orElseThrow(CUserNotFoundException::new);
//
//        StringBuilder sb = new StringBuilder();
//        sb.append(email);
//        sb.append("_local");
//
//            String filename =s3Uploader.upload(files,sb.toString(),"profile");
//            userService.setProfileImage(user,filename);
//
//
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK,filename);
//    }
//
//
//    @PostMapping("/user/changeDefaultImage")
//    @ApiOperation(value ="프로필 이미지 변경" ,notes="기본이미지로 변경하기")
//    public ResponseEntity<Object> changeDefaultImage( Integer number, String email) throws IOException {
//        User user=userService.findByEmailAndProvider(email,"local").orElseThrow(CUserNotFoundException::new);
//
//        String filename =s3Uploader.setDefaultImage(email,number);
//
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK,filename);
//    }


    @ApiOperation(value = "이메일 로그인", notes = "이메일로 로그인")
    @PostMapping("/login")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "로그인 성공"
                    , response = AccessTokenDto.class
            )
            , @ApiResponse(
            code = 1101
            , message = "존재하지 않는 이메일 입니다."
    )
            , @ApiResponse(
            code = 1102
            , message = "비밀번호가 이메일과 일치하지않습니다."
    )
    })
    public ResponseEntity<Object> login(
            @ApiParam(value = "로그인 요청 DTO", required = true) @RequestBody UserLoginRequestDto userLoginRequestDto) throws JsonProcessingException {
        System.out.println(userLoginRequestDto.getEmail() + " " + userLoginRequestDto.getPassword());
        TokenDto tokenDto = userService.login(userLoginRequestDto);

        return ResponseHandler.generateResponse("로그인 성공", HttpStatus.OK, new AccessTokenDto(tokenDto.getAccessToken()));

    }


//    @PostMapping("/token/isvalid")
//    public ResponseEntity<?> validToken(String refreshToken) {
//        boolean isValid = jwtProvider.validateToken(refreshToken);
//        return ResponseHandler.generateResponse("토큰 유효 확인 성공", HttpStatus.OK, isValid);
//    }


    @ApiOperation(value = "엑세스,리프레시 토큰 재발급"
            , notes = "엑세스 리프레시 토큰 만료시 회원 검증 후 리프레시 토큰을 검증해서 엑세스 토큰과 리프레시 토큰을 재발급한다.")
    @PostMapping("/reissue")
    public ResponseEntity<Object> check(
//            @ApiParam(value = "토큰 재발급 요청 DTO", required = true)
            @RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, userService.reissue(tokenRequestDto).getAccessToken());
    }

    @ApiOperation(value = "비밀 번호 변경을 위해서 이메일 인증번호를 이메일로 발송하기"
            , notes = "이메일에 비밀번호를 바꾸기 위한 인증번호를 발송한다.")
    @PostMapping("/user/password/find")
    public ResponseEntity<Object> findPassword(
//            @ApiParam(value = "PasswordFindDTO", required = true)
            @RequestBody PasswordFindDTO passwordFindDTO) throws MessagingException, IOException {
        User user = userService.findByEmailAndProvider(passwordFindDTO.getEmail(), "local").orElseThrow(LoginFailedByEmailNotExistException::new);
        String code = emailService.findPassword(passwordFindDTO.getEmail(), user.getName());
        // 나중에 이름이나 닉네임으로 추가 인증
//        if(user.getName().equals(name)){
//        }
        return ResponseHandler.generateResponse("비밀번호 변경을 위한 코드 성공", HttpStatus.OK,null);
    }


    @ApiOperation(value = "이메일 인증코드확인후 비밀번호 변경"
            , notes = "이메일 인증코드확인후 비밀번호 변경")
    @PostMapping("/user/password/find/confirm")
    public ResponseEntity<Object> passwordSet(
            @ApiParam(value = "PasswordFindDTO", required = true)
            @RequestBody PasswordConfirmDTO passwordConfirmDTO) {
        userService.findByEmailAndProvider(passwordConfirmDTO.getEmail(), "local").orElseThrow(LoginFailedByEmailNotExistException::new);
        emailService.codeForPasswordFinder(passwordConfirmDTO.getEmail(),passwordConfirmDTO.getCode());
        User user = userService.findByEmailAndProvider(passwordConfirmDTO.getEmail(), "local").get();
        userService.changePassword(user, passwordConfirmDTO.getChange_password());
        // 나중에 이름이나 닉네임으로 추가 인증
        return ResponseHandler.generateResponse("성공", HttpStatus.OK, null);
    }

//    @PostMapping("/user/password/change")
//    public ResponseEntity<Object> changePwd(@PathVariable String email, String previous, String change_password) {
//        userService.findByEmailAndProvider(email, "local").orElseThrow(LoginFailedByEmailNotExistException::new);
//        User user = userService.findByEmailAndProvider(email, "local").get();
//        userService.passwordCheck(user, previous);
//        userService.changePassword(user, change_password);
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK, change_password);
//    }
//    @PostMapping("/user/addCategory")
//    public ResponseEntity<Object> addCategory(@RequestBody LikedCategoryDto likedCategoryDto) {
//        System.out.println(likedCategoryDto.getEmail()+"      -     "+likedCategoryDto.getProvider());
//        User user= userService.findByEmailAndProvider(likedCategoryDto.getEmail(),likedCategoryDto.getProvider()).orElseThrow(LoginFailedByEmailNotExistException::new);
//        List<Long> input=likedCategoryService.deleteDuplicateCategory(likedCategoryDto.getCategoryId());
//        List<Long> usersLike=   likedCategoryService.findUsersLike(user);
//        List<Long> result =likedCategoryService.addLikedCategory(user,input,usersLike);
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK,result);
//    }


}
