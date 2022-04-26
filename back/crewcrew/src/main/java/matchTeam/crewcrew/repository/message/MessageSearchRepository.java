package matchTeam.crewcrew.repository.message;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.message.MessageResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class MessageSearchRepository {
    private final JPAQueryFactory queryFactory;

    /*public ArrayList<MessageResponseDTO> search(BoardSpecs boardSpecs, Pageable pageable) {
        List<BoardResponseDTO> content = queryFactory
                .select(new QBoardResponseDTO(board))
                .from(board)
                .where(
                        board.viewable.eq(true),
                        approachCodeIn(boardSpecs.getApproach()),
                        categoriesIn(boardSpecs.getCategoryIds()),
                        titleContentLike(boardSpecs.getKeyword())
                ).offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(findOrder(boardSpecs.getOrder()),
                        board.createdDate.desc())
                .fetch();

        JPAQuery<Board> countQuery = queryFactory
                .select(board)
                .from(board)
                .where(
                        board.viewable.eq(true),
                        approachCodeIn(boardSpecs.getApproach()),
                        categoriesIn(boardSpecs.getCategoryIds()),
                        titleContentLike(boardSpecs.getKeyword())
                ).orderBy(findOrder(boardSpecs.getOrder()),
                        board.createdDate.desc());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }*/
}
