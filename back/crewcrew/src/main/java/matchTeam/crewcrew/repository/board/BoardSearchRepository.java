package matchTeam.crewcrew.repository.board;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.board.QBoardResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.specification.BoardSpecs;
import matchTeam.crewcrew.specification.OrderByNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static matchTeam.crewcrew.entity.board.QBoard.board;
import static org.springframework.util.CollectionUtils.isEmpty;
import static org.springframework.util.StringUtils.hasText;


@RequiredArgsConstructor
@Repository
public class BoardSearchRepository{

    private final JPAQueryFactory queryFactory;
    private final CategoryRepository categoryRepository;

    public Page<BoardResponseDTO> search(BoardSpecs boardSpecs, Pageable pageable) {
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
    }

    private OrderSpecifier<?> findOrder(String order){
        if (! hasText(order)){
            return OrderByNull.DEFAULT;
        }
        else if (order.equals("recent")){
            return board.createdDate.desc();
        }else if (order.equals("popular")){
            return board.hit.desc();
        }else if (order.equals("expired-date")){
            return board.expiredDate.asc();
        }else if (order.equals("expired-crew")){
            return board.totalCrew.subtract(board.recruitedCrew).asc();
        }
        else {
            return OrderByNull.DEFAULT;
        }
    }

    private BooleanExpression titleContentLike(String keyword){
        return hasText(keyword) ? board.title.contains(keyword).or(board.boardContent.contains(keyword)) : null;
    }

    private BooleanExpression approachCodeIn(List<Integer> approach){
        return isEmpty(approach) ? null : board.approach.in(approach);
    }

    private BooleanExpression categoriesIn(List<Long> categoryIds){
        if (isEmpty(categoryIds)){
            return null;
        } else {
            List<Category> result = new ArrayList<>();
            for (Long categoryId:categoryIds) {
                result.add(categoryRepository.findById(categoryId)
                        .orElseThrow(NotExistCategoryException::new));
            }
            return board.category.in(result);
        }

    }
}
