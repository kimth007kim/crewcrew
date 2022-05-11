package matchTeam.crewcrew.dto.application;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@NoArgsConstructor
@Getter
public class UpdateApplyRequestDTO {

    @ApiModelProperty(value = "신청서 id")
    private Long apId;

    @ApiModelProperty(value = "신청서를 작성한 유저의 uid")
    private Long uid;

    @ApiModelProperty(value = "신청서의 상태(DECLINED, APPLY, COMPLETED, CANCELED)")
    private String status;

    public UpdateApplyRequestDTO(Long apId, Long uid, String status) {
        this.apId = apId;
        this.uid = uid;
        this.status = status;
    }
}
