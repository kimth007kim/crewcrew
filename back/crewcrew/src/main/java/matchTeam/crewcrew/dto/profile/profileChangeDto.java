package matchTeam.crewcrew.dto.profile;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class profileChangeDto {
//    @ApiModelProperty(value="이메일 주소", example = "abc@naver.com",dataType = "String")
//    private String email;
    @ApiModelProperty(value="비밀번호",example = "abcd12345678",dataType = "String")
    private String password;
    @ApiModelProperty(value="이름",example = "김경동",dataType = "String")
    private String name;
    @ApiModelProperty(value="닉네임",example = "momo",dataType = "String")
    private String nickName;
    @ApiModelProperty(value="프로필 이미지",example = "profileImage.jpg",dataType = "MultipartFile")
    private MultipartFile file;
    @ApiModelProperty(value="카테고리 아이디",example = "[3,4,5]",dataType = "Array[Long]")
    private List<Long> categoryId;
    @ApiModelProperty(value="한줄 메시지",example = "안녕하세요 저는 김경동입니다.",dataType = "String")
    private String message;
}
