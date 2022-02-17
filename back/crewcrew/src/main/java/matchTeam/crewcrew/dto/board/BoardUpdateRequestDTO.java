package matchTeam.crewcrew.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class BoardUpdateRequestDTO {
    private Long uid;
    private String title;
    private String boardContent;
    private Integer recruitedCrew;
    private Integer totalCrew;
    private Integer approachCode;
    private Long categoryId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @ApiModelProperty(value = "만료날짜", notes = "만료날짜를 선택해주세요", required = true, example = "2022-02-06")
    @NotNull(message = "만료 날짜를 선택해주세요.")
    private LocalDate expiredDate;

    @Builder
    public BoardUpdateRequestDTO(Long uid, String title, String boardContent,
                                 Integer recruitedCrew, Integer totalCrew,
                                 Integer approachCode, Long categoryId, LocalDate expiredDate) {
        this.uid = uid;
        this.title = title;
        this.boardContent = boardContent;
        this.recruitedCrew = recruitedCrew;
        this.totalCrew = totalCrew;
        this.approachCode = approachCode;
        this.categoryId = categoryId;
        this.expiredDate = expiredDate;
    }
}
