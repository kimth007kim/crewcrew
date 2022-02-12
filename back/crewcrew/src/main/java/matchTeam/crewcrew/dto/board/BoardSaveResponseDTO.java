package matchTeam.crewcrew.dto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.BoardApproach;

import java.time.LocalDate;

@Getter
public class BoardSaveResponseDTO {
    private Long id;
    private String title;
    private String boardContent;
    private Integer recruitedCrew;
    private Integer totalCrew;
    private Integer approachCode;
    private Long categoryId;
    private Long categoryParentId;
    private LocalDate expiredDate;

    @Builder
    public BoardSaveResponseDTO(Board res) {
        this.id = res.getId();
        this.title = res.getTitle();
        this.boardContent = res.getBoardContent();
        this.recruitedCrew = res.getRecruitedCrew();
        this.totalCrew = res.getTotalCrew();
        this.approachCode = res.getApproach().getApproachCode();
        this.categoryId = res.getCategory().getId();
        this.categoryParentId = res.getCategory().getCategoryParent().getId();
        this.expiredDate = res.getExpiredDate();
    }
}
