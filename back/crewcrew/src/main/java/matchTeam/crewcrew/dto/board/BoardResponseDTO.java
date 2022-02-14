package matchTeam.crewcrew.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.BoardApproach;
import matchTeam.crewcrew.entity.board.Category;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class BoardResponseDTO {
    private Long boardId;
    private String title;
    private Long userId;
    private String boardContent;
    private Integer appliedCrew;
    private Integer recruitedCrew;
    private Integer totalCrew;
    private Integer approachCode;
    private Long categoryId;
    private Long categoryParentId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime createdDate;
    private LocalDate expiredDate;

    @Builder
    public BoardResponseDTO(Board res) {
        this.boardId = res.getId();
        this.title = res.getTitle();
        this.userId = res.getUser().getUid();
        this.boardContent = res.getBoardContent();
        this.appliedCrew = res.getAppliedCrew();
        this.recruitedCrew = res.getRecruitedCrew();
        this.totalCrew = res.getTotalCrew();
        this.approachCode = res.getApproach().getApproachCode();
        this.categoryId = res.getCategory().getId();
        this.categoryParentId = res.getCategory().getCategoryParent().getId();
        this.createdDate = res.getCreatedDate();
        this.expiredDate = res.getExpiredDate();
    }

    public static BoardResponseDTO toDTO(Board board){
        return BoardResponseDTO.builder()
                .res(board).build();
    }
}
