package matchTeam.crewcrew.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class BoardUpdateRequestDTO {


    @ApiModelProperty(value = "게시글 제목", notes = "게시글 제목을 입력해주세요", required = true, example = "my title")
    @NotBlank(message = "게시글 제목을 입력해주세요.")
    private String title;

    @ApiModelProperty(value = "게시글 본문", notes = "게시글 본문을 입력해주세요", required = true, example = "my content")
    @NotBlank(message = "게시글 본문을 입력해주세요.")
    private String boardContent;

   /* @ApiModelProperty(value = "모집된 크루원 수", notes = "모집된 크루원 수를 입력해주세요", required = true, example = "3")
    @NotNull(message = "지금 현재 모집된 크루원 수 입력해주세요.(총 모집수 보다 작아야합니다.)")
    private Integer recruitedCrew;*/

    @ApiModelProperty(value = "총 모집 크루원 수", notes = "총 모집 크루원 수를 입력해주세요", required = true, example = "10")
    @NotNull(message = "총 모집 크루원 수 입력해주세요.(모집하는 크루원수보다 크거나 같아야 합니다.)")
    private Integer totalCrew;

    @ApiModelProperty(value = "온라인(1) or 오프라인(0)", notes = "0은 오프라인, 1은 온라인", required = true, example = "1")
    @NotNull(message = "모집방식을 선택해주세요.")
    private Integer approachCode;

    @ApiModelProperty(value = "카테고리 아이디", notes = "카테고리를 선택해주세요", required = true, example = "3")
    @NotNull(message = "카테고리 아이디를 입력해주세요.")
    @PositiveOrZero(message = "카테고리 아이디를 입력해주세요.(3부터 시작됩니다.)")
    private Long categoryId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @ApiModelProperty(value = "만료날짜", notes = "만료날짜를 선택해주세요", required = true, example = "2022-02-06")
    @NotNull(message = "만료 날짜를 선택해주세요.")
    private LocalDate expiredDate;

    @ApiModelProperty(value = "오픈채팅 링크", notes = "오픈채팅 링크를 입력해주세요", required = true)
    @NotNull(message = "오픈채팅 링크를 입력해주세요.")
    @Column(name = "kakao_chat", nullable = false)
    private String kakaoChat;

    @Builder
    public BoardUpdateRequestDTO(String title, String boardContent,
                                  Integer totalCrew,
                                 Integer approachCode, Long categoryId, LocalDate expiredDate, String kakaoChat) {
        this.title = title;
        this.boardContent = boardContent;
//        this.recruitedCrew = recruitedCrew;
        this.totalCrew = totalCrew;
        this.approachCode = approachCode;
        this.categoryId = categoryId;
        this.expiredDate = expiredDate;
        this.kakaoChat = kakaoChat;
    }
}
