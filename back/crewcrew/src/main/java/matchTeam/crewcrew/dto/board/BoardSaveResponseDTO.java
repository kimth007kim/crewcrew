package matchTeam.crewcrew.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Board;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class BoardSaveResponseDTO {
    private Long uid;
    private Long boardId;
    private String title;
    private String boardContent;
    private Integer recruitedCrew;
    private Integer totalCrew;
    private Integer approachCode;
    private Long categoryId;
    private Long categoryParentId;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdDate;
    private LocalDate expiredDate;
    private Long hit;

    @Builder
    public BoardSaveResponseDTO(Board res) {
        this.uid = res.getUser().getUid();
        this.boardId = res.getId();
        this.title = res.getTitle();
        this.boardContent = res.getBoardContent();
        this.recruitedCrew = res.getRecruitedCrew();
        this.totalCrew = res.getTotalCrew();
        this.approachCode = res.getApproach();
        this.categoryId = res.getCategory().getId();
        this.categoryParentId = res.getCategory().getCategoryParent().getId();
        this.expiredDate = res.getExpiredDate();
        this.createdDate = res.getCreatedDate();
        this.hit = res.getHit();
    }
}
