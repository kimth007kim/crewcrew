package matchTeam.crewcrew.controller.api.v1.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.MalformedJwtException;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.security.ResponseTokenDto;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.security.TokenRequestDto;
import matchTeam.crewcrew.dto.user.*;
import matchTeam.crewcrew.dto.user.example.UserResponseDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.response.exception.auth.*;
import matchTeam.crewcrew.service.amazonS3.S3Uploader;
import matchTeam.crewcrew.service.user.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@Api(tags = "1. Auth")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {


    private final UserService userService;
    private final EmailService emailService;
    private final LikedCategoryService likedCategoryService;
    private final S3Uploader s3Uploader;
    private final CookieService cookieService;


    @ApiOperation(value = "이메일 인증코드 발송", notes = "1. 유효한 이메일 인지 확인합니다.\n " +
            "2. 이미 같은 이메일로 가입되어있는지 확인합니다\n" +
            "3. 1,2번 조건을 만족했다면 해당 메일로 인증코드를 보냅니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "인증번호 발송 성공"
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
            throw new CrewException(ErrorCode.EMAIL_NOT_VALID);
//            1001 이메일이 유효하지 않다.
        }

        //이미 가입되었는지 확인하는 메서드
        if (userService.findByEmailAndProvider(email, "local").isPresent()) {
            throw new CrewException(ErrorCode.USER_ALREADY_EXIST);
//            1002 이미 존재하는 유저이다.
        }
        // 이메일 전송하는메서드
        String code = emailService.sendVerifyCode(email);

        return ResponseHandler.generateResponse("인증번호 발송 성공", HttpStatus.OK, null);
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


//    @PostMapping(value = "/signUp", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    @ApiOperation(value = "이메일 회원가입", notes = "이메일로 회원가입을 합니다. \n" + "1. 프로필 이미지로 가입시  file=Multipartfile, default 는 사용하지않습니다. \n" + "2. 기본이미지로 회원가입시  file을 사용하지않고 default =1~5  를 사용합니다.")
//    @ApiResponses({
//            @ApiResponse(
//                    code = 200
//                    , message = "회원가입 성공"
//                    , response = UserResponseDto.class
//            )
//            , @ApiResponse(
//            code = 1004
//            , message = "이메일 인증이 되지않은 이메일 주소입니다."
//    )
//            , @ApiResponse(
//            code = 1005
//            , message = "현재 입력한 이메일을 가진 유저가 이미 존재합니다. "
//    )
//            , @ApiResponse(
//            code = 1007
//            , message = "이미 존재하는 닉네임 입니다. "
//    ), @ApiResponse(
//            code = 1009
//            , message = "비밀번호에 이모지가 존재합니다.  "
//    ), @ApiResponse(
//            code = 1010
//            , message = "비밀번호가 8~25자 가 아니거나 특수문자나 영어 숫자가 최소 1개 이상 포함되어있지 않습니다."
//    ), @ApiResponse(
//            code = 1011
//            , message = "비밀번호에 공백이 발견되었습니다."
//    ), @ApiResponse(
//            code = 1012
//            , message = "이름이 0자이거나 10자를 초과하였습니다."
//    ), @ApiResponse(
//            code = 1013
//            , message = "닉네임이 0자이거나 16자를 초과하였습니다."
//    )
//            , @ApiResponse(
//            code = 1501
//            , message = "S3에 업로드하는것을 실패하였습니다."
//    )
//            , @ApiResponse(
//            code = 1502
//            , message = "S3에 업로드할 파일을 찾을 수 없습니다."
//    )
//            , @ApiResponse(
//            code = 2001
//            , message = "존재하지 않는 카테고리 번호입니다."
//    )
//    })
//    public ResponseEntity<Object> signUp(
//            @ApiParam(value = "email 주소", required = true)
//            @RequestParam String email,
//            @ApiParam(value = "비밀번호", required = true)
//            @RequestParam String password,
//            @ApiParam(value = "회원 이름", required = true)
//            @RequestParam String name,
//            @ApiParam(value = "회원 닉네임", required = true)
//            @RequestParam String nickName,
//            @ApiParam(value = "프로필 이미지")
//            @RequestParam(required = false) MultipartFile file,
//            @ApiParam(value = "회원이 좋아하는 카테고리 ID", required = true)
//            @RequestParam List<Long> categoryId,
//            @ApiParam(value = "한줄 메세지")
//            @RequestParam(required = false) String message,
//            @ApiParam(value = "디폴트 이미지 선택")
//            @RequestParam(required = false) Integer Default) {
////                 String email,  String password, String name, String nickName, MultipartFile file, List<Long> categoryId) {
////                @ModelAttribute SignUpRequestDto signUpRequestDto) {
//        SignUpRequestDto signUpRequestDto = new SignUpRequestDto(email, password, name, nickName, file, categoryId);
//        System.out.println("email: " + email + "password: " + password + "name: " + name + "nickname" + "file: " + file + "categoryId" + categoryId);
//
//        if (userService.findByEmailAndProvider(email, "local").isPresent()) {
//            throw new CUserAlreadyExistException();
//        }
//
//
//        userService.validateDuplicateByNickname(nickName);
//        likedCategoryService.validLikedCategory(categoryId);
//        System.out.println(signUpRequestDto.getEmail());
//        emailService.checkVerifiedEmail(signUpRequestDto.getEmail());
//        //1004 이메일인증이 안된 이메일
//        //1005 현재 입력한 이메일로 이미 존재할 경우
//        userService.validationNickName(nickName);
//        userService.validationName(name);
//        userService.validationPasswd(password);
//        String email_url = email.replace("@", "_");
//
//        String filename = s3Uploader.addImageWhenSignUp(email_url, file, Default, "local");
//
//        Long signupId = userService.signup(signUpRequestDto);
//        User user = userService.findByUid(signupId);
//        userService.setProfileImage(user, filename);
//        userService.setMessage(user, message);
//
//
//        List<Long> usersLike = likedCategoryService.findUsersLike(user);
//
//        List<Long> input = likedCategoryService.deleteDuplicateCategory(signUpRequestDto.getCategoryId());
//
//
//        System.out.println("중복을 제거한 카테고리" + input);
//        List<Long> result = likedCategoryService.addLikedCategory(user, input);
//        System.out.println("유저가 등록한 후의 카테고리" + result);
//
//        UserResponseDto userResponseDto = new UserResponseDto(signupId, signUpRequestDto.getEmail(), signUpRequestDto.getName(), signUpRequestDto.getNickName(), filename, result, user.getMessage(), user.getProvider());
//
//        return ResponseHandler.generateResponse("회원가입 성공", HttpStatus.OK, userResponseDto);
//    }



    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "이메일 회원가입", notes = "이메일로 회원가입을 합니다. \n" + "1. 프로필 이미지로 가입시  file=Multipartfile, default 는 사용하지않습니다. \n" + "2. 기본이미지로 회원가입시  file을 사용하지않고 default =1~5  를 사용합니다.")

    public ResponseEntity<Object> register(
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
            @RequestParam(required = false) Integer Default,HttpServletResponse response) {
        System.out.println("-----file----------"+file);
            ResponseTokenDto responseTokenDto= userService.register(email,password,name,nickName,file,  categoryId,message,Default);
            cookieService.responseCookie(response,responseTokenDto);
        return ResponseHandler.generateResponse("회원가입 성공", HttpStatus.OK, null);
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
    @GetMapping("/user/name/{name}")
    @ApiOperation(value = "이름 유효성 체크", notes = "이름 유효성 체크")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "닉네임 중복 확인 성공"
                    , response = boolean.class
            )
            , @ApiResponse(
            code = 1012
            , message = "이름이 0자이거나 10자를 초과하였습니다."
    )

    })
    public ResponseEntity<Object> checkName(@PathVariable String name) {
        userService.validationName(name);
        return ResponseHandler.generateResponse("이름 중복 확인 성공", HttpStatus.OK, true);
    }


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
            @ApiParam(value = "로그인 요청 DTO", required = true) @RequestBody UserLoginRequestDto userLoginRequestDto, HttpServletResponse response) throws JsonProcessingException {
        System.out.println(userLoginRequestDto.getEmail() + " " + userLoginRequestDto.getPassword());
        ResponseTokenDto tokenDto = userService.login(userLoginRequestDto);
//        Cookie accessCookie = cookieService.generateAccessToken(tokenDto.getAccessToken());
//        Cookie refreshCookie = cookieService.generateRefreshToken(tokenDto.getRefreshToken(), tokenDto.getRefreshTokenExpireDate());

        Cookie accessCookie = cookieService.generateXAuthCookie("X-AUTH-TOKEN", tokenDto.getAccessToken(), tokenDto.getAccessTokenExpireDate());
        Cookie refreshCookie = cookieService.generateCookie("refreshToken", tokenDto.getRefreshToken(), tokenDto.getRefreshTokenExpireDate());

        System.out.println("refreshCookie = " + refreshCookie);
        System.out.println("accessCookie = " + accessCookie);

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
//        User user = userService.findByEmailAndProvider(userLoginRequestDto.getEmail(), "local").orElseThrow(()->new CrewException(ErrorCode.PK_USER_NOT_FOUND));
//        List<Long> likedCategoryId=likedCategoryService.findUsersLike(user);
//        UserResponseDto userResponseDto = new UserResponseDto(user.getUid(), user.getEmail(), user.getName(), user.getNickname(), user.getProfileImage(), likedCategoryId, user.getMessage(), user.getProvider());
        AccessTokenDto token = new AccessTokenDto(tokenDto.getAccessToken());
        return ResponseHandler.generateResponse("로그인 성공", HttpStatus.OK, token);

    }


//    @PostMapping("/token/isvalid")
//    public ResponseEntity<?> validToken(String refreshToken) {
//        boolean isValid = jwtProvider.validateToken(refreshToken);
//        return ResponseHandler.generateResponse("토큰 유효 확인 성공", HttpStatus.OK, isValid);
//    }


//    @ApiOperation(value = "엑세스,리프레시 토큰 재발급"
//            , notes = "엑세스 리프레시 토큰 만료시 회원 검증 후 리프레시 토큰을 검증해서 엑세스 토큰과 리프레시 토큰을 재발급한다.")
//    @ApiResponses({
//            @ApiResponse(
//                    code = 200
//                    , message = "리프레시 토큰 재발급 성공"
//                    , response = TokenDto.class
//            )
//            , @ApiResponse(
//            code = 1901
//            , message = "유효하지않은 리프레시 토큰입니다."
//    )
//            , @ApiResponse(
//            code = 1902
//            , message = "토큰의 pk로 유저를 찾을수 없습니다."
//    )
//            , @ApiResponse(
//            code = 1903
//            , message = "DB에 해당 Refresh 토큰이 존재하지않습니다."
//    )
//            , @ApiResponse(
//            code = 1904
//            , message = "입력받은 Refresh토큰이 DB에 저장된 Refresh토큰과 다릅니다."
//    )
//            , @ApiResponse(
//            code = 9999
//            , message = "권한이 부족한 토큰의 접근입니다."
//    )
//    })
//    @PostMapping("/reissue")
//    public ResponseEntity<Object> check(
////            @ApiParam(value = "토큰 재발급 요청 DTO", required = true)
//            @RequestBody TokenRequestDto tokenRequestDto) {
//        return ResponseHandler.generateResponse("리프레시 토큰 재발급 성공", HttpStatus.OK, userService.reissue(tokenRequestDto).getAccessToken());
//    }

    @ApiOperation(value = "비밀 번호 변경을 위해서 이메일 인증번호를 이메일로 발송하기"
            , notes = "이메일에 비밀번호를 바꾸기 위한 인증번호를 발송한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "비밀번호 변경을 위한 코드 성공"
            )
            , @ApiResponse(
            code = 1101
            , message = "존재하지 않는 이메일 입니다."
    )
    })
    @PostMapping("/user/password/find")
    public ResponseEntity<Object> findPassword(
//            @ApiParam(value = "PasswordFindDTO", required = true)
            @RequestBody PasswordFindDTO passwordFindDTO) throws MessagingException, IOException {
        User user = userService.findByEmailAndProvider(passwordFindDTO.getEmail(), "local").orElseThrow(()-> new CrewException(ErrorCode.EMAIL_NOT_EXIST));
        String code = emailService.findPassword(passwordFindDTO.getEmail(), user.getName());
        // 나중에 이름이나 닉네임으로 추가 인증
//        if(user.getName().equals(name)){
//        }
        return ResponseHandler.generateResponse("비밀번호 변경을 위한 코드 성공", HttpStatus.OK, null);
    }


    @ApiOperation(value = "이메일 인증코드확인후 비밀번호 변경"
            , notes = "이메일 인증코드확인후 비밀번호 변경")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "비밀 번호 변경 성공"
            )
            , @ApiResponse(
            code = 1101
            , message = "존재하지 않는 이메일 입니다."
    )
            , @ApiResponse(
            code = 1003
            , message = "발급된 인증 코드가 이메일과 다릅니다."
    )
            , @ApiResponse(
            code = 1009
            , message = "비밀번호에 이모지가 존재합니다.  "
    )
            , @ApiResponse(
            code = 1010
            , message = "비밀번호가 8~25자 가 아니거나 특수문자나 영어 숫자가 최소 1개 이상 포함되어있지 않습니다."
    )
            , @ApiResponse(
            code = 1011
            , message = "비밀번호에 공백이 발견되었습니다."
    )
    })
    @PostMapping("/user/password/find/confirm")
    public ResponseEntity<Object> passwordConfirm(
            @ApiParam(value = "PasswordFindDTO", required = true)
            @RequestBody PasswordConfirmDTO passwordConfirmDTO) {
        userService.findByEmailAndProvider(passwordConfirmDTO.getEmail(), "local").orElseThrow(()-> new CrewException(ErrorCode.EMAIL_NOT_EXIST));
        emailService.codeForPasswordFinder(passwordConfirmDTO.getEmail(), passwordConfirmDTO.getCode());
        User user = userService.findByEmailAndProvider(passwordConfirmDTO.getEmail(), "local").get();
        userService.validationPasswd(passwordConfirmDTO.getChange_password());
        userService.changePassword(user, passwordConfirmDTO.getChange_password());
        // 나중에 이름이나 닉네임으로 추가 인증
        return ResponseHandler.generateResponse("비밀 번호 변경 성공", HttpStatus.OK, null);
    }


    @ApiOperation(value = "이메일과 인증코드 확인"
            , notes = "이메일 인증코드가 일치하는지 확인 합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "인증 코드 일치"
            ),
            @ApiResponse(
                    code = 200
                    , message = "인증 코드 불일치"
            )
            , @ApiResponse(
            code = 1101
            , message = "존재하지 않는 이메일 입니다."
    )
            , @ApiResponse(
            code = 1003
            , message = "발급된 인증 코드가 이메일과 다릅니다."
    )
    })
    @PostMapping("/user/password/find/check")
    public ResponseEntity<Object> passwordCheck(
            @ApiParam(value = "PasswordCheckDTO", required = true)
            @RequestBody PasswordCheckDTO passwordCheckDTO) {
        userService.findByEmailAndProvider(passwordCheckDTO.getEmail(), "local").orElseThrow(()->new CrewException(ErrorCode.EMAIL_NOT_EXIST));
        emailService.codeForPasswordFinder(passwordCheckDTO.getEmail(), passwordCheckDTO.getCode());
        // 나중에 이름이나 닉네임으로 추가 인증
        return ResponseHandler.generateResponse("인증 코드 일치", HttpStatus.OK, null);
    }


    @PostMapping("/cookie/test")
    public ResponseEntity<Object> cookieTest(HttpServletResponse response) {
        System.out.println("안녕");
        // 나중에 이름이나 닉네임으로 추가 인증
        Cookie myCookie = new Cookie("AccessToken", "hello");
        myCookie.setDomain("crewcrew.org");
        myCookie.setPath("/");
        myCookie.setHttpOnly(true);
        myCookie.setSecure(true);
        response.addCookie(myCookie);
        return ResponseHandler.generateResponse("인증 코드 일치", HttpStatus.OK, null);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(
                    name = "X-AUTH-TOKEN",
                    value = "로그인 성공후 AccessToken",
                    required = true, dataType = "String", paramType = "header"
            )
    })
    @ApiResponses({

            @ApiResponse(
                    code = 200
                    , message = "엑세스토큰 으로 유저 정보 조회 성공"
                    , response = UserResponseDto.class
            )
            , @ApiResponse(
            code = 1900
            , message = "입력받은 엑세스토큰에 해당하는 유저가없습니다"
    )

    })
    @ApiOperation(value = "엑세스토큰 으로 유저 정보 조회.", notes = "엑세스 토큰으로 유저정보를 조회합니다.\n" + "※주의: kakao,naver에서 받은 인가코드로는 불가능합니다.\n" + " 카카오와 네이버에서 인가코드를 받고 로그인후 받은 Access Token는 가능합니다.")
    @GetMapping("/token")
    public ResponseEntity<Object> checkToken(@RequestHeader("X-AUTH-TOKEN") String headerToken) {
        User user = userService.tokenChecker(headerToken);
        if (user == null) {
            return ResponseHandler.generateResponse("엑세스토큰 으로 유저 정보 조회 성공", HttpStatus.OK, null);
        }
        List<Long> liked = likedCategoryService.findUsersLike(user);
        UserResponseDto userResponseDto = new UserResponseDto(user.getUid(), user.getEmail(), user.getName(), user.getNickname(), user.getProfileImage(), liked, user.getMessage(), user.getProvider());

        return ResponseHandler.generateResponse("엑세스토큰 으로 유저 정보 조회 성공", HttpStatus.OK, userResponseDto);

//        log.info("컨트롤러에서의 재발급 요청");
////        System.out.println("X-AUTH-TOKEN"+token);


    }

    @ApiResponses({

            @ApiResponse(
                    code = 200
                    , message = "엑세스토큰 으로 유저 정보 조회 성공"
                    , response = UserResponseDto.class
            )
            , @ApiResponse(
            code = 1900
            , message = "입력받은 엑세스토큰에 해당하는 유저가없습니다"
    )

    })
    @ApiOperation(value = "로그아웃")
    @DeleteMapping("/logout")
    public ResponseEntity<Object> logOut(HttpServletRequest request, HttpServletResponse response) {
        cookieService.logOut(request, response);
        return ResponseHandler.generateResponse("로그아웃 성공", HttpStatus.OK, null);
    }

    @DeleteMapping("/user")
    public ResponseEntity<Object> test(@RequestHeader("X-AUTH-TOKEN") String token) {
        User user = userService.tokenChecker(token);
        userService.deleteUser(user);
        return ResponseHandler.generateResponse("회원 탈퇴 성공", HttpStatus.OK, null);
    }


}
