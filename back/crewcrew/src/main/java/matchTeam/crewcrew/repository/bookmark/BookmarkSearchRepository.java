package matchTeam.crewcrew.repository.bookmark;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSpecs;
import matchTeam.crewcrew.dto.bookmark.BookmarkResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.bookmark.Bookmark;
import matchTeam.crewcrew.entity.bookmark.QBookmark;
import matchTeam.crewcrew.response.exception.board.NotExistOrderKeywordException;
import matchTeam.crewcrew.util.customException.OrderByNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static matchTeam.crewcrew.entity.board.QBoard.board;
import static matchTeam.crewcrew.entity.bookmark.QBookmark.bookmark;
import static org.springframework.util.StringUtils.hasText;

@RequiredArgsConstructor
@Repository
public class BookmarkSearchRepository {
    private final JPAQueryFactory queryFactory;
    public Page<BoardPageDetailResponseDTO> search(Long userId, Pageable pageable, String order) {
        List<BoardPageDetailResponseDTO> content = queryFactory
                .select(Projections.constructor(BoardPageDetailResponseDTO.class, board))
                .from(board)
                .innerJoin(bookmark)
                .on(board.id.eq(bookmark.boardId.id))
                .where(
                        board.viewable.eq(true),
                        bookmark.uid.uid.eq(userId)
                ).offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(findOrder(order))
                .fetch();

        JPAQuery<Bookmark> countQuery = queryFactory
                .select(bookmark)
                .from(board)
                .innerJoin(bookmark)
                .on(board.id.eq(bookmark.boardId.id))
                .where(
                        board.viewable.eq(true),
                        bookmark.uid.uid.eq(userId)
                ).orderBy(bookmark.bookmarkId.desc());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    public boolean isBookmarked(Long userId, Long boardId){
        List<BookmarkResponseDTO> bm = queryFactory
                .select(Projections.constructor(BookmarkResponseDTO.class, bookmark))
                .from(bookmark)
                .where(bookmark.boardId.id.eq(boardId).and(bookmark.uid.uid.eq(userId)))
                .fetch();
        return bm.size() != 0;
    }

    private OrderSpecifier<?> findOrder(String order){
        if (!hasText(order)){
            return OrderByNull.DEFAULT;
        }
        else if (order.equals("recent")){
            return board.createdDate.desc();
        }else if (order.equals("bookmarked")){
            return bookmark.bookmarkId.desc();
        } else {
            throw new NotExistOrderKeywordException();
        }
    }
}
