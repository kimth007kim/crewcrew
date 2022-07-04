package matchTeam.crewcrew.dto.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class BoardCountByUidResponseDTO {

    private Long recruitedCrewCntInStudy = 0L;
    private Long recruitedCrewCntInHobby = 0L;
    private Long totRecruitedCrewCnt = 0L;
    private Long acceptedCrewCntInStudy = 0L;
    private Long acceptedCrewCntInHobby = 0L;
    private Long totAcceptedCrewCnt = 0L;

    @Builder
    public BoardCountByUidResponseDTO(Long recruitedCrewCntInStudy, Long recruitedCrewCntInHobby, Long totRecruitedCrewCnt, Long acceptedCrewCntInStudy, Long acceptedCrewCntInHobby, Long totAcceptedCrewCnt) {
        this.recruitedCrewCntInStudy = recruitedCrewCntInStudy;
        this.recruitedCrewCntInHobby = recruitedCrewCntInHobby;
        this.totRecruitedCrewCnt = totRecruitedCrewCnt;
        this.acceptedCrewCntInStudy = acceptedCrewCntInStudy;
        this.acceptedCrewCntInHobby = acceptedCrewCntInHobby;
        this.totAcceptedCrewCnt = totAcceptedCrewCnt;
    }
}
