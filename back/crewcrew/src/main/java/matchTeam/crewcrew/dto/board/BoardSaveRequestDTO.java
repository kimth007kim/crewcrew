package matchTeam.crewcrew.dto.board;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.BoardApproach;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.util.customException.CategoryNotFoundException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@NoArgsConstructor
@Getter
public class BoardSaveRequestDTO {

    //@ApiModelProperty(value = "게시글 제목", notes = "게시글 제목을 입력해주세요", required = true, example = "my title")
    //@NotBlank(message = "게시글 제목을 입력해주세요.")
    private String title;

    //@ApiModelProperty(value = "게시글 본문", notes = "게시글 본문을 입력해주세요", required = true, example = "my content")
    //@NotBlank(message = "게시글 본문을 입력해주세요.")
    private String boardContent;

    //@ApiModelProperty(value = "모집하는 크루원 수", notes = "모집하는 크루원 수를 입력해주세요", required = true, example = "3")
    //@NotNull(message = "모집하는 크루원 수 입력해주세요.")
    private Integer recruitedCrew;

    //@ApiModelProperty(value = "총 모집 크루원 수", notes = "총 모집 크루원 수를 입력해주세요", required = true, example = "10")
    //@NotNull(message = "총 모집 크루원 수 입력해주세요.")
    private Integer totalCrew;

    //@ApiModelProperty(value = "온라인 or 오프라인", notes = "온라인인지 오프라인인지 선택해주세요", required = true, example = "온라인")
    //@NotNull(message = "모집방식을 선택해주세요.")
    //@Enumerated(EnumType.STRING)
    private BoardApproach approach;

    private Long userId;

    //@ApiModelProperty(value = "카테고리 아이디", notes = "카테고리를 선택해주세요", required = true, example = "3")
    //@NotNull(message = "카테고리 아이디를 입력해주세요.")
    //@PositiveOrZero(message = "올바른 카테고리 아이디를 입력해주세요.")
    private Long categoryId;

    @Builder
    public BoardSaveRequestDTO(String title, String boardContent,
                               Integer recruitedCrew, Integer totalCrew, BoardApproach approach,
                               Long userId, Long categoryId) {
        this.title = title;
        this.boardContent = boardContent;
        this.recruitedCrew = recruitedCrew;
        this.totalCrew = totalCrew;
        this.approach = approach;
        this.userId = userId;
        this.categoryId = categoryId;
    }

    public Board toEntity(BoardSaveRequestDTO req, UserRepository userRepository, CategoryRepository categoryRepository){
        return Board.builder()
                .title(req.title)
                .boardContent(req.boardContent)
                .recruitedCrew(req.recruitedCrew)
                .totalCrew(totalCrew)
                .approach(approach)
                .user(userRepository.findById(req.getUserId()).orElseThrow(UserNotFoundException::new))
                .category(categoryRepository.findById(req.getCategoryId()).orElseThrow(CategoryNotFoundException::new))
                .build();
    }
}
