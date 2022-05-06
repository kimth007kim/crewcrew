package matchTeam.crewcrew.dto.user;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Getter
@Setter
public class ProfileChangeRequestDto {
    @ApiModelProperty(value="비밀번호",example = "abcd12345678",dataType = "String")
    String password;
    @ApiModelProperty(value="이름",example = "김경동",dataType = "String")
    String name;
    @ApiModelProperty(value="닉네임",example = "kimth007kim",dataType = "String")
    String nickName;
//    MultipartFile file;
    @ApiModelProperty(value="카테고리 아이디",example = "[3,4,5]",dataType = "Array[Long]")
    List<Long> categoryId;
    @ApiModelProperty(value="한줄 메세지",example = "안녕하세요 저는 ~ 입니다.",dataType = "String")
    String message;
}
