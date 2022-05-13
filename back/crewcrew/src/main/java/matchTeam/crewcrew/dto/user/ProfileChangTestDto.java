package matchTeam.crewcrew.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;

import java.util.List;

@Getter
@Setter
public class ProfileChangTestDto {
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


    public ProfileChangTestDto(){
        this.password= null;
        this.name = null;
        this.nickName = null;
        this.categoryId= null;
        this.message = null;
    }
}
