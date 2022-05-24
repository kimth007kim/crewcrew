package matchTeam.crewcrew.dto.application;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ApplicationParticipatedCrewResponseDTO {

    private Long participatedCount = 0L;

    @Builder
    public ApplicationParticipatedCrewResponseDTO(Long participatedCount) {
        this.participatedCount = participatedCount;
    }
}
