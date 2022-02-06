package matchTeam.crewcrew.dto.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.BoardApproach;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class BoardUpdateRequestDTO {
    private String title;
    private String boardContent;
    private Integer recruitedCrew;
    private Integer totalCrew;
    private BoardApproach approach;
    private Integer categoryId;
    private LocalDate expiredDate;

    @Builder
    public BoardUpdateRequestDTO(String title, String boardContent,
                                 Integer recruitedCrew, Integer totalCrew, BoardApproach approach, Integer categoryId,
                                 LocalDate expiredDate) {
        this.title = title;
        this.boardContent = boardContent;
        this.recruitedCrew = recruitedCrew;
        this.totalCrew = totalCrew;
        this.approach = approach;
        this.categoryId = categoryId;
        this.expiredDate = expiredDate;
    }
}
