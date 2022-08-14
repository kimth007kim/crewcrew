package matchTeam.crewcrew.dto.application;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import matchTeam.crewcrew.entity.board.Board;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class MyRecruitingBoardResponseDTO {

    @ApiModelProperty(value = "게시글의 id", notes = "저장에 성공한 게시글 id", example = "1")
    private Long boardId;

    @ApiModelProperty(value = "게시글 제목", notes = "게시글 제목", example = "test title")
    private String title;

    @ApiModelProperty(value = "게시글 본문 내용", notes = "게시글 본문 내용", example = "test content")
    private String boardContent;

    @ApiModelProperty(value = "지원자의 수", notes = "지원자의 수", example = "0")
    private Integer appliedCrew;

    @ApiModelProperty(value = "모집하는 인원수", notes = "모집하는 인원수", example = "5")
    private Integer recruitedCrew;

    @ApiModelProperty(value = "총인원수", notes = "총인원수", example = "5")
    private Integer totalCrew;

    @ApiModelProperty(value = "모임 접근 방식", notes = "0은 오프라인, 1은 온라인", example = "0")
    private Integer approachCode;

    @ApiModelProperty(value = "상위카테고리 id", notes = "상위 카테고리 번호", example = "1")
    private Long categoryParentId;

    @ApiModelProperty(value = "하위 카테고리 id", notes = "상세 카테고리 번호", example = "5")
    private Long categoryId;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty(value = "작성날짜", notes = "년원일 시간 분", example = "2022-02-16 09:30")
    private LocalDateTime createdDate;

    @ApiModelProperty(value = "만료날짜", notes = "년원일", example = "2022-02-27")
    private LocalDate expiredDate;

    @ApiModelProperty(value = "조회수", notes = "초깃값은 0", example = "14")
    private Long hit;

    @ApiModelProperty(value = "만료여부", notes = "만료여부를 true(만료x) or false(만료됨)로 표현", example = "1")
    private Boolean viewable;

    @ApiModelProperty(value = "오픈채팅방 링크")
    private String kakaoChat;

    @QueryProjection
    @Builder
    public MyRecruitingBoardResponseDTO(Board res) {
        this.boardId = res.getId();
        this.title = res.getTitle();
        this.boardContent = res.getBoardContent();
        this.appliedCrew = res.getAppliedCrew();
        this.recruitedCrew = res.getRecruitedCrew();
        this.totalCrew = res.getTotalCrew();
        this.approachCode = res.getApproach();
        this.categoryId = res.getCategory().getId();
        this.categoryParentId = res.getCategory().getCategoryParent().getId();
        this.createdDate = res.getCreatedDate();
        this.expiredDate = res.getExpiredDate();
        this.hit = res.getHit()+1;
        this.viewable = res.getViewable();
        this.kakaoChat = res.getKakaoChat();
    }

    public static MyRecruitingBoardResponseDTO toDTO(Board board){
        return MyRecruitingBoardResponseDTO.builder()
                .res(board).build();
    }
}
