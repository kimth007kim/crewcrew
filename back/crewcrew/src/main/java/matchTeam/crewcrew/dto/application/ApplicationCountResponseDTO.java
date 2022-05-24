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
    private Long applyToStudyCount = 0L;

    @ApiModelProperty(value = "취미 카테고리로 들어온 신청서의 개수")
    private Long applyToHobbyCount = 0L;

    @ApiModelProperty(value = "신청서의 총합")
    private Long totalApplyCount = 0L;

    @Builder
    public ApplicationCountResponseDTO(List<ApplicationResponseDTO> results) {
        for (ApplicationResponseDTO res:results) {
            if (res.getCategoryParentId().equals(1L)){
                this.applyToStudyCount += res.getApllicationCount();
            }else {
                this.applyToHobbyCount += res.getApllicationCount();
            }
            totalApplyCount = results.stream().mapToLong(s -> s.getApllicationCount()).sum();
        }
    }
}
