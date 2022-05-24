package matchTeam.crewcrew.dto.application;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ApplicationResponseDTO {

    private Long categoryParentId;
    private Long apllicationCount;

    @QueryProjection
    @Builder
    public ApplicationResponseDTO(Long categoryParentId, Long apllicationCount) {
        this.categoryParentId = categoryParentId;
        this.apllicationCount = apllicationCount;
    }
}
