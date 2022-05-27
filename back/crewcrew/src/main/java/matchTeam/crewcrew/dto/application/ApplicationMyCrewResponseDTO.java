package matchTeam.crewcrew.dto.application;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ApplicationMyCrewResponseDTO {

    private Long myCrewCount = 0L;

    @Builder
    public ApplicationMyCrewResponseDTO(Long myCrewCount) {
        this.myCrewCount = myCrewCount;
    }
}
