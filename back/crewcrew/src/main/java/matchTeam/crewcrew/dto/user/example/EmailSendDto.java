package matchTeam.crewcrew.dto.user.example;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmailSendDto {
    @ApiModelProperty(example = "AJDNSAS")
    private String code;
}
