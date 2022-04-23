package matchTeam.crewcrew.dto.application;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class ApplicationCountResponseDTO {

    @ApiModelProperty(value = "스터디 카테고리로 들어온 신청서의 개수")
    private Long applyToStudy = 0L;

    @ApiModelProperty(value = "취미 카테고리로 들어온 신청서의 개수")
    private Long applyToHobby = 0L;

    @ApiModelProperty(value = "신청서의 총합")
    private Long totalApply = 0L;

    @Builder
    public ApplicationCountResponseDTO(List<ApplicationResponseDTO> results) {
        for (ApplicationResponseDTO res:results) {
            if (res.getCategoryParentId().equals(1L)){
                this.applyToStudy += res.getCountApllication();
            }else {
                this.applyToHobby += res.getCountApllication();
            }
            totalApply = results.stream().mapToLong(s -> s.getCountApllication()).sum();
        }
    }
}
