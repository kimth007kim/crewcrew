package matchTeam.crewcrew.dto.bookmark;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.bookmark.Bookmark;
import matchTeam.crewcrew.entity.user.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Getter
public class BookmarkSaveRequestDTO {
    @ApiModelProperty(value = "북마크 id", notes = "북마크에 저장하려는 게시물의 id", required = true, example = "1")
    @NotNull(message = "북마크 id를 넣어주세요.")
    private Long boardId;

    @ApiModelProperty(value = "유저 id", notes = "북마크를 저장하려는 유저의 id", required = true, example = "1")
    @NotNull(message = "보내는 유저 uid를 넣어주세요.")
    private Long uid;

    @Builder
    public BookmarkSaveRequestDTO(Long boardId, Long uid) {
        this.boardId = boardId;
        this.uid = uid;
    }

    public Bookmark toEntity(User user, Board board){
        return Bookmark.builder()
                .uid(user)
                .boardId(board)
                .build();
    }
}
