package matchTeam.crewcrew.controller.api.v1.profile;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.user.LikedCategoryDto;
import matchTeam.crewcrew.dto.user.ProfileChangTestDto;
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
import java.util.ArrayList;
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
            code = 2002
            , message = "부모 카테고리에 대해 조회했습니다."
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
            , @ApiResponse(
            code = 3005
            , message = "카테고리에서 스터디 항목이 선택되지 않았습니다."
    )
            , @ApiResponse(
            code = 3006
            , message = "카테고리에서 취미 항목이 선택되지 않았습니다."
    )
    })
    @PutMapping(value = "/mypage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> profileChange(@RequestHeader("X-AUTH-TOKEN") String token, @RequestPart(value="ProfileChangeRequestDto") ProfileChangeRequestDto profileChangeRequestDto, @RequestPart(value = "file",required = false) MultipartFile file) throws IOException {
        String password = profileChangeRequestDto.getPassword();
        String nickName = profileChangeRequestDto.getNickName();
        String name = profileChangeRequestDto.getName();
        List<Long> categoryId= profileChangeRequestDto.getCategoryId();
        String message = profileChangeRequestDto.getMessage();
        if (categoryId == null){
            categoryId=new ArrayList<Long>();
        }

        User user = userService.tokenChecker(token);

        if (file != null && !file.isEmpty()) {
            String tempName = s3Uploader.nameFile(user.getEmail(), user.getProvider());
            String filename = s3Uploader.upload(file, tempName, "profile");
            userService.setProfileImage(user, filename);
        }
        userService.validProfileChange(user,password,name,nickName,categoryId,message);
        userService.profileChange(user, password, name, nickName, categoryId, message);
        return ResponseHandler.generateResponse("성공", HttpStatus.OK, "변경 성공");
    }



    @PutMapping(value = "/test", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> test( @RequestPart(value="ProfileChangeRequestDto") ProfileChangeRequestDto profileChangeRequestDto, @RequestPart(value = "file",required = false) MultipartFile file) throws IOException {
        String password = profileChangeRequestDto.getPassword();
        String nickName = profileChangeRequestDto.getNickName();
        String name = profileChangeRequestDto.getName();
        List<Long> categoryId= profileChangeRequestDto.getCategoryId();
        String message = profileChangeRequestDto.getMessage();
        if (categoryId == null){
            categoryId=new ArrayList<Long>();
        }

//        User user = userService.tokenChecker(token);

        User user =userService.findByUid(50L);
        if (file != null && !file.isEmpty()) {
            String tempName = s3Uploader.nameFile(user.getEmail(), user.getProvider());
            String filename = s3Uploader.upload(file, tempName, "profile");
            userService.setProfileImage(user, filename);
        }
        userService.validProfileChange(user,password,name,nickName,categoryId,message);
        userService.profileChange(user, password, name, nickName, categoryId, message);
        return ResponseHandler.generateResponse("성공", HttpStatus.OK, "변경 성공");
    }


}
