package matchTeam.crewcrew.dto.bookmark;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.bookmark.Bookmark;

@NoArgsConstructor
@Getter
public class BookmarkResponseDTO {
    @ApiModelProperty(value = "북마크의 id", notes = "저장에 성공한 북마크의 id", example = "1")
    private Long bookmarkId;

    @ApiModelProperty(value = "유저의 id", notes = "북마크 저장에 성공한 유저의 id", example = "1")
    private Long uid;

    @ApiModelProperty(value = "게시물의 id", notes = "성공적으로 북마크된 게시물의 id", example = "1")
    private Long boardId;

    @QueryProjection
    @Builder
    public BookmarkResponseDTO(Bookmark res) {
        this.bookmarkId = res.getBookmarkId();
        this.uid = res.getUid().getUid();
        this.boardId = res.getBoardId().getId();
    }

    public static BookmarkResponseDTO toDTO(Bookmark bookmark){
        return BookmarkResponseDTO.builder()
                .res(bookmark).build();
    }

}
