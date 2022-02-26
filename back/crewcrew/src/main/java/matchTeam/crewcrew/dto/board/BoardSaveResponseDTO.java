package matchTeam.crewcrew.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
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

    @ApiModelProperty(value = "유저의 uid", notes = "게시글 저장에 성공한 유저의 uid")
    private Long uid;

    @ApiModelProperty(value = "게시글의 id", notes = "저장에 성공한 게시글 id")
    private Long boardId;

    @ApiModelProperty(value = "게시글 제목", notes = "게시글 제목")
    private String title;

    @ApiModelProperty(value = "게시글 본문 내용", notes = "게시글 본문 내용")
    private String boardContent;

    @ApiModelProperty(value = "모집된 인원수", notes = "모집된 인원수")
    private Integer recruitedCrew;

    @ApiModelProperty(value = "총인원수", notes = "총인원수")
    private Integer totalCrew;

    @ApiModelProperty(value = "모임 접근 방식", notes = "0은 오프라인, 1은 온라인")
    private Integer approachCode;

    @ApiModelProperty(value = "카테고리 id", notes = "상위 카테고리 번호")
    private Long categoryParentId;

    @ApiModelProperty(value = "카테고리 id", notes = "상세 카테고리 번호")
    private Long categoryId;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty(value = "작성일", notes = "년원일 시간 분까지")
    private LocalDateTime createdDate;

    @ApiModelProperty(value = "만료날짜", notes = "년원일")
    private LocalDate expiredDate;

    @ApiModelProperty(value = "조회수", notes = "초깃값은 0")
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
