package matchTeam.crewcrew.dto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.BoardApproach;

@Getter
public class BoardSaveResponseDTO {
    private Long id;
    private String title;
    private String boardContent;
    private Integer recruitedCrew;
    private Integer totalCrew;
    private BoardApproach approach;
    private Long categoryId;

    @Builder
    public BoardSaveResponseDTO(Board rep) {
        this.id = rep.getId();
        this.title = rep.getTitle();
        this.boardContent = rep.getBoardContent();
        this.recruitedCrew = rep.getRecruitedCrew();
        this.totalCrew = rep.getTotalCrew();
        this.approach = rep.getApproach();
        this.categoryId = rep.getCategory().getId();
    }
}
