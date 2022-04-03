package matchTeam.crewcrew.dto.application;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ApplicationResponseDTO {

    private Long categoryParentId;
    private Long countApllication;

    @QueryProjection
    @Builder
    public ApplicationResponseDTO(Long categoryParentId, Long countApllication) {
        this.categoryParentId = categoryParentId;
        this.countApllication = countApllication;
    }
}
