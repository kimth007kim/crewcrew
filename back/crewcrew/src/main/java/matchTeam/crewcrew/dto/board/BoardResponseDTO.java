package matchTeam.crewcrew.dto.board;

import lombok.Builder;
import lombok.Getter;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.BoardApproach;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class BoardResponseDTO {
    private Long id;
    private String title;
    private Long userId;
    private String boardContent;
    private Integer appliedCrew;
    private Integer recruitedCrew;
    private Integer totalCrew;
    private BoardApproach approach;
    private Long categoryId;
    private LocalDateTime createdDate;
    private LocalDate expiredDate;

    @Builder
    public BoardResponseDTO(Board res) {
        this.id = res.getId();
        this.title = res.getTitle();
        this.userId = res.getUser().getUid();
        this.boardContent = res.getBoardContent();
        this.appliedCrew = res.getAppliedCrew();
        this.recruitedCrew = res.getRecruitedCrew();
        this.totalCrew = res.getTotalCrew();
        this.approach = res.getApproach();
        this.categoryId = res.getCategory().getId();
        this.createdDate = res.getCreatedDate();
        this.expiredDate = res.getExpiredDate();
    }

    public static BoardResponseDTO toDTO(Board board){
        return BoardResponseDTO.builder()
                .res(board).build();
    }
}
