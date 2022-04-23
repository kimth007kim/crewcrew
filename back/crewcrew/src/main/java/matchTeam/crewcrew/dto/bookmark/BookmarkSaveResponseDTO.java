package matchTeam.crewcrew.dto.bookmark;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.bookmark.Bookmark;

@NoArgsConstructor
@Getter
public class BookmarkSaveResponseDTO {

    @ApiModelProperty(value = "북마크 id", notes = "저장에 성공한 북마크의 id", required = true, example = "1")
    private Long bookmarkId;

    @ApiModelProperty(value = "유저 id", notes = "북마크 저장에 성공한 유저의 id", required = true, example = "1")
    private Long uid;

    @ApiModelProperty(value = "게시물 id", notes = "성공적으로 북마크에 저장된 게시물의 id", required = true, example = "1")
    private Long boardId;

    @Builder
    public BookmarkSaveResponseDTO(Bookmark res) {
        this.bookmarkId = res.getBookmarkId();
        this.uid = res.getUid().getUid();
        this.boardId = res.getBoardId().getId();
    }
}
