package matchTeam.crewcrew.dto.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class BoardCountByUidResponseDTO {

    private Long recruitedCrewCnt = 0L;
    private Long acceptedCrewCnt = 0L;

    @Builder
    public BoardCountByUidResponseDTO(Long recruitedCrewCnt, Long acceptedCrewCnt) {
        this.recruitedCrewCnt = recruitedCrewCnt;
        this.acceptedCrewCnt = acceptedCrewCnt;
    }
}
