package matchTeam.crewcrew.dto.user.example;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    @ApiModelProperty(example = "1")
    private Long uid;
    @ApiModelProperty(example = "abc@naver.com")
    private String email;
    @ApiModelProperty(example = "김경동")
    private String name;
    @ApiModelProperty(example = "momo")
    private String nickName;
    @ApiModelProperty(example = "s3://2kdwldw.com/abc@naver.com_local/profile")
    private String file;
    @ApiModelProperty(example = "[1,2,3]")
    private List<Long> categoryId;
    @ApiModelProperty(example = "안녕하세요 김경동입니다! 잘부탁 드립니다")
    private String message;
    

}
