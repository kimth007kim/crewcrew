package matchTeam.crewcrew.dto.application;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class ApplicationCountResponseDTO {
    
    private Long applyToStudy = 0L;
    private Long applyToHobby = 0L;
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
