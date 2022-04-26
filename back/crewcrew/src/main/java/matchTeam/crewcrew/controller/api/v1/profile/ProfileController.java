package matchTeam.crewcrew.controller.api.v1.profile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.user.LikedCategoryDto;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.auth.CUserNotFoundException;
import matchTeam.crewcrew.response.exception.auth.LoginFailedByEmailNotExistException;
import matchTeam.crewcrew.service.amazonS3.S3Uploader;
import matchTeam.crewcrew.service.user.EmailService;
import matchTeam.crewcrew.service.user.LikedCategoryService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final EmailService emailService;
    private final LikedCategoryService likedCategoryService;
    private final S3Uploader s3Uploader;

    @GetMapping("/test")
    public ResponseEntity<Object> hi() {
        ;

        return ResponseHandler.generateResponse("성공", HttpStatus.OK, null);
    }


    @PutMapping("/test")
    public ResponseEntity<Object> profileChange(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @ApiParam(value = "비밀번호", required = false)
            @RequestParam(required = false) String password,
            @ApiParam(value = "회원 이름", required = false)
            @RequestParam(required = false) String name,
            @ApiParam(value = "회원 닉네임", required = false)
            @RequestParam(required = false) String nickName,
            @ApiParam(value = "프로필 이미지", required = false)
            @RequestParam(required = false) MultipartFile file,
            @ApiParam(value = "회원이 좋아하는 카테고리 ID", required = false)
            @RequestParam(required = false) List<Long> categoryId,
            @ApiParam(value = "한줄 메세지", required = false)
            @RequestParam(required = false) String message,
            @ApiParam(value = "디폴트 이미지 선택", required = false)
            @RequestParam(required = false) Integer Default) {

        User user = userService.tokenChecker(token);
        if ((file==null && Default!=null)) {
            String filename = s3Uploader.addImageWhenSignUp(user.getEmail(),Default,user.getProvider());
            userService.setProfileImage(user,filename);
        }else if(file!=null){
            String filename = s3Uploader.addImageWhenSignUp(user.getEmail(),file,Default,user.getProvider());
            userService.setProfileImage(user,filename);
        }
        userService.profileChange(user,password,name,nickName,categoryId,message);
//        Optional<User> user = userService.findByEmailAndProvider(email,provider);
        return ResponseHandler.generateResponse("성공", HttpStatus.OK, user);
    }

    @PostMapping("/changeProfileImage")
    @ApiOperation(value = "프로필 이미지 변경", notes = "이미지를 입력받아서 s3에 등록하고 db에 그 url을 저장합니다.")
    public ResponseEntity<Object> changeProfileImage(@RequestParam MultipartFile files, String email, String provider) throws IOException {
        User user = userService.findByEmailAndProvider(email, "local").orElseThrow(CUserNotFoundException::new);

        StringBuilder sb = new StringBuilder();
        sb.append(email);
        sb.append("_local");

        String filename = s3Uploader.upload(files, sb.toString(), "profile");
        userService.setProfileImage(user, filename);


        return ResponseHandler.generateResponse("성공", HttpStatus.OK, filename);
    }


    @PostMapping("/changeDefaultImage")
    @ApiOperation(value = "프로필 이미지 변경", notes = "기본이미지로 변경하기")
    public ResponseEntity<Object> changeDefaultImage(Integer number, String email) throws IOException {
        User user = userService.findByEmailAndProvider(email, "local").orElseThrow(CUserNotFoundException::new);

        String filename = s3Uploader.setDefaultImage(email, number);

        return ResponseHandler.generateResponse("성공", HttpStatus.OK, filename);
    }

    @PostMapping("/password/change")
    public ResponseEntity<Object> changePwd(@PathVariable String email, String previous, String change_password) {
        userService.findByEmailAndProvider(email, "local").orElseThrow(LoginFailedByEmailNotExistException::new);
        User user = userService.findByEmailAndProvider(email, "local").get();
        userService.changePassword(user, change_password);
        return ResponseHandler.generateResponse("성공", HttpStatus.OK, change_password);
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Object> addCategory(@RequestBody LikedCategoryDto likedCategoryDto) {
        System.out.println(likedCategoryDto.getEmail() + "      -     " + likedCategoryDto.getProvider());
        User user = userService.findByEmailAndProvider(likedCategoryDto.getEmail(), likedCategoryDto.getProvider()).orElseThrow(LoginFailedByEmailNotExistException::new);
        List<Long> input = likedCategoryService.deleteDuplicateCategory(likedCategoryDto.getCategoryId());
        List<Long> usersLike = likedCategoryService.findUsersLike(user);
        List<Long> result = likedCategoryService.addLikedCategory(user, input);
        return ResponseHandler.generateResponse("성공", HttpStatus.OK, result);
    }

}
