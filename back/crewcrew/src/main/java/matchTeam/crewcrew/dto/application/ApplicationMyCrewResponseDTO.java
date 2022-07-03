package matchTeam.crewcrew.dto.application;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ApplicationMyCrewResponseDTO {

    private Long myExpiredBoardCnt = 0L;
    private Long myAcceptedApplyBoardCnt = 0L;

    @Builder
    public ApplicationMyCrewResponseDTO(Long myExpiredBoardCnt, Long myAcceptedApplyBoardCnt) {
        this.myExpiredBoardCnt = myExpiredBoardCnt;
        this.myAcceptedApplyBoardCnt = myAcceptedApplyBoardCnt;
    }
}
