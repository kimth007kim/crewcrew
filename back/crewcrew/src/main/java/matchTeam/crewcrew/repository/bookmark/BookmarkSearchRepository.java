package matchTeam.crewcrew.repository.bookmark;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSpecs;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.response.exception.board.NotExistOrderKeywordException;
import matchTeam.crewcrew.util.customException.OrderByNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static matchTeam.crewcrew.entity.board.QBoard.board;
//import static matchTeam.crewcrew.entity.bookmark.QBookmark.bookmark;
import static org.springframework.util.StringUtils.hasText;

@RequiredArgsConstructor
@Repository
public class BookmarkSearchRepository {

    private final JPAQueryFactory queryFactory;
    public Page<BoardPageDetailResponseDTO> search(Long userId, Pageable pageable) {
        // select board from board where boardid.eq(select boardid from bookmark
        // where userid.eq(bookmark.uid)) ??????!!!
        List<BoardPageDetailResponseDTO> content = queryFactory
                .select(Projections.constructor(BoardPageDetailResponseDTO.class, board))
                .from(board)
                .where(
                        //board.id.eq(queryFactory.select(board.id).from(bookmark))
                ).offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(findOrder("recent"),
                        board.createdDate.desc())
                .fetch();

        JPAQuery<Board> countQuery = queryFactory
                .select(board)
                .from(board)
                .where(

                ).orderBy(findOrder("recent"),
                        board.createdDate.desc());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    private OrderSpecifier<?> findOrder(String order){
        if (! hasText(order)){
            return OrderByNull.DEFAULT;
        }
        else if (order.equals("recent")){
            return board.createdDate.desc();
        }else if (order.equals("popular")){
            return board.hit.desc();
        }else if (order.equals("expired")){
            return board.expiredDate.asc();
        } else {
            throw new NotExistOrderKeywordException();
        }
    }
}
