package matchTeam.crewcrew.controller.api.v1.profile;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.user.LikedCategoryDto;
import matchTeam.crewcrew.dto.user.ProfileChangeRequestDto;
import matchTeam.crewcrew.dto.user.example.UserResponseDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.auth.CUserNotFoundException;
import matchTeam.crewcrew.response.exception.auth.LoginFailedByEmailNotExistException;
import matchTeam.crewcrew.service.amazonS3.S3Uploader;
import matchTeam.crewcrew.service.user.EmailService;
import matchTeam.crewcrew.service.user.LikedCategoryService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Api(tags = "9. Profile")
@RequiredArgsConstructor
@RestController
//@RequestMapping("/api/v1/auth/")
@RequestMapping("/profile")
public class ProfileController {

    private final UserService userService;
    private final S3Uploader s3Uploader;



//        @PutMapping(value="/test", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Object> profileChange(@RequestPart(value="key") ProfileChangeRequestDto profileChangeRequestDto, @RequestPart(value = "img",required = false) MultipartFile img) {
//
//
//        User user = userService.tokenChecker(token);
//        if (file != null) {
//            String tempName =s3Uploader.nameFile(user.getEmail(),user.getProvider());
//            String filename = s3Uploader.upload(file,tempName,"profile");
//            userService.setProfileImage(user, filename);
//        }
//
//        userService.profileChange(user, password, name, nickName, categoryId, message);
//        Optional<User> user = userService.findByEmailAndProvider(email,provider);
////        return ResponseHandler.generateResponse("성공", HttpStatus.OK, user);
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK, null);
//    }

    @ApiResponses({
            @ApiResponse(
                    code = 200
                    , message = "변경 성공"
            )
            , @ApiResponse(
            code = 1007
            , message = "이미 존재하는 닉네임 입니다. "
    )       , @ApiResponse(
            code = 1009
            , message = "비밀번호에 이모지가 존재합니다.  "
    )       , @ApiResponse(
            code = 1010
            , message = "비밀번호가 8~25자 가 아니거나 특수문자나 영어 숫자가 최소 1개 이상 포함되어있지 않습니다."
    )       , @ApiResponse(
            code = 1011
            , message = "비밀번호에 공백이 발견되었습니다."
    )
            , @ApiResponse(
            code = 1012
            , message = "이름이 0자이거나 10자를 초과하였습니다."
    )
            , @ApiResponse(
            code = 1013
            , message = "닉네임이 0자이거나 16자를 초과하였습니다."
    )       , @ApiResponse(
            code = 1014
            , message = "한줄 메세지가 0자이거나 25자를 초과하였습니다."
    )
            , @ApiResponse(
            code = 1501
            , message = "S3에 업로드하는것을 실패하였습니다."
    )
            , @ApiResponse(
            code = 1502
            , message = "S3에 업로드할 파일을 찾을 수 없습니다."
    )
            , @ApiResponse(
            code = 1900
            , message = "입력받은 엑세스토큰에 해당하는 유저가없습니다."
    )
            , @ApiResponse(
            code = 3001
            , message = "카테고리가 선택되지 않았습니다."
    )
            , @ApiResponse(
            code = 3002
            , message = "닉네임이 입력되지 않았습니다."
    )
            , @ApiResponse(
            code = 3003
            , message = "이름이 입력되지 않았습니다."
    )
            , @ApiResponse(
            code = 3004
            , message = "메세지가 입력되지 않았습니다."
    )
    })
    @PutMapping(value = "/mypage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> profileChange(@RequestHeader("X-AUTH-TOKEN") String token, @RequestPart(value="ProfileChangeRequestDto") ProfileChangeRequestDto profileChangeRequestDto, @RequestPart(value = "file",required = false) MultipartFile file) throws IOException {
        String password = profileChangeRequestDto.getPassword();
        String nickName = profileChangeRequestDto.getNickName();
        String name = profileChangeRequestDto.getName();
        List<Long> categoryId= profileChangeRequestDto.getCategoryId();
        String message = profileChangeRequestDto.getMessage();

        User user = userService.tokenChecker(token);

        if (file != null && !file.isEmpty()) {
            String tempName = s3Uploader.nameFile(user.getEmail(), user.getProvider());
            String filename = s3Uploader.upload(file, tempName, "profile");
            userService.setProfileImage(user, filename);
        }
        userService.profileChange(user, password, name, nickName, categoryId, message);
        return ResponseHandler.generateResponse("성공", HttpStatus.OK, "변경 성공");
    }
//    @ApiResponses({
//            @ApiResponse(
//                    code = 200
//                    , message = "회원가입 성공"
//                    , response = UserResponseDto.class
//            )
//            , @ApiResponse(
//            code = 1007
//            , message = "이미 존재하는 닉네임 입니다. "
//    )       , @ApiResponse(
//            code = 1009
//            , message = "비밀번호에 이모지가 존재합니다.  "
//    )       , @ApiResponse(
//            code = 1010
//            , message = "비밀번호가 8~25자 가 아니거나 특수문자나 영어 숫자가 최소 1개 이상 포함되어있지 않습니다."
//    )       , @ApiResponse(
//            code = 1011
//            , message = "비밀번호에 공백이 발견되었습니다."
//    )
//            , @ApiResponse(
//            code = 1012
//            , message = "이름이 0자이거나 10자를 초과하였습니다."
//    )
//            , @ApiResponse(
//            code = 1013
//            , message = "닉네임이 0자이거나 16자를 초과하였습니다."
//    )       , @ApiResponse(
//            code = 1014
//            , message = "한줄 메세지가 0자이거나 25자를 초과하였습니다."
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
//            code = 1900
//            , message = "입력받은 엑세스토큰에 해당하는 유저가없습니다."
//    )
//            , @ApiResponse(
//            code = 3001
//            , message = "카테고리가 선택되지 않았습니다."
//    )
//            , @ApiResponse(
//            code = 3002
//            , message = "닉네임이 입력되지 않았습니다."
//    )
//            , @ApiResponse(
//            code = 3003
//            , message = "이름이 입력되지 않았습니다."
//    )
//            , @ApiResponse(
//            code = 3004
//            , message = "메세지가 입력되지 않았습니다."
//    )
//    })
//    @PutMapping(value = "/mypage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Object> profileChange(
//            @RequestHeader("X-AUTH-TOKEN") String token,
//            @ApiParam(value = "비밀번호")
//            @RequestParam(required = false) String password,
//            @ApiParam(value = "회원 이름")
//            @RequestParam(required = true) String name,
//            @ApiParam(value = "회원 닉네임")
//            @RequestParam(required = true) String nickName,
//            @ApiParam(value = "프로필 이미지")
//            @RequestParam(required = false) MultipartFile file,
//            @ApiParam(value = "회원이 좋아하는 카테고리 ID")
//            @RequestParam(required = true) List<Long> categoryId,
//            @ApiParam(value = "한줄 메세지")
//            @RequestParam(required = true) String message) throws IOException {
//
//
//        User user = userService.tokenChecker(token);
//
//        if (file != null && !file.isEmpty()) {
//            String tempName = s3Uploader.nameFile(user.getEmail(), user.getProvider());
//            String filename = s3Uploader.upload(file, tempName, "profile");
//            userService.setProfileImage(user, filename);
//        }
//        userService.profileChange(user, password, name, nickName, categoryId, message);
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK, user);
//    }

//    @PostMapping("/changeProfileImage")
//    @ApiOperation(value = "프로필 이미지 변경", notes = "이미지를 입력받아서 s3에 등록하고 db에 그 url을 저장합니다.")
//    public ResponseEntity<Object> changeProfileImage(@RequestParam MultipartFile files, String email, String provider) throws IOException {
//        User user = userService.findByEmailAndProvider(email, "local").orElseThrow(CUserNotFoundException::new);
//
//        StringBuilder sb = new StringBuilder();
//        sb.append(email);
//        sb.append("_local");
//
//        String filename = s3Uploader.upload(files, sb.toString(), "profile");
//        userService.setProfileImage(user, filename);
//
//
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK, filename);
//    }
//
//
//    @PostMapping("/changeDefaultImage")
//    @ApiOperation(value = "프로필 이미지 변경", notes = "기본이미지로 변경하기")
//    public ResponseEntity<Object> changeDefaultImage(Integer number, String email) throws IOException {
//        User user = userService.findByEmailAndProvider(email, "local").orElseThrow(CUserNotFoundException::new);
//
//        String filename = s3Uploader.setDefaultImage(email, number);
//
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK, filename);
//    }
//
//    @PostMapping("/password/change")
//    public ResponseEntity<Object> changePwd(@PathVariable String email, String previous, String change_password) {
//        userService.findByEmailAndProvider(email, "local").orElseThrow(LoginFailedByEmailNotExistException::new);
//        User user = userService.findByEmailAndProvider(email, "local").get();
//        userService.changePassword(user, change_password);
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK, change_password);
//    }
//
//    @PostMapping("/addCategory")
//    public ResponseEntity<Object> addCategory(@RequestBody LikedCategoryDto likedCategoryDto) {
//        System.out.println(likedCategoryDto.getEmail() + "      -     " + likedCategoryDto.getProvider());
//        User user = userService.findByEmailAndProvider(likedCategoryDto.getEmail(), likedCategoryDto.getProvider()).orElseThrow(LoginFailedByEmailNotExistException::new);
//        List<Long> input = likedCategoryService.deleteDuplicateCategory(likedCategoryDto.getCategoryId());
//        List<Long> usersLike = likedCategoryService.findUsersLike(user);
//        List<Long> result = likedCategoryService.addLikedCategory(user, input);
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK, result);
//    }

}
