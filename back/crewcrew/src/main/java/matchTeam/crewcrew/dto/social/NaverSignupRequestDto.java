package matchTeam.crewcrew.dto.social;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NaverSignupRequestDto {
    @ApiModelProperty(example = "AAAAOh3H9eMJNYKfL_tG2sQ9zRA4Odohgk-EbDm8pa9RX3VOo7CcYiHoW04xo0z2k06Es2tVRqrMQ9rxGGkMTAbLbAU")
    private String accessToken;
    @ApiModelProperty(example = "momo")
    private String nickName;
    @ApiModelProperty(example = "[3,4,5]")
    private List<Long> categoryId;
    @ApiModelProperty(example = "안녕하세요 김경동입니다.")
    private String message;
}
