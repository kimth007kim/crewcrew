package matchTeam.crewcrew.repository.application;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.ApplicationCountResponseDTO;
import matchTeam.crewcrew.dto.application.ApplicationResponseDTO;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.board.QBoardResponseDTO;
import matchTeam.crewcrew.entity.application.QApplication;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static matchTeam.crewcrew.entity.board.QBoard.board;
import static matchTeam.crewcrew.entity.board.QCategory.category;
import static matchTeam.crewcrew.entity.application.QApplication.application;
import static org.springframework.util.CollectionUtils.isEmpty;
import static org.springframework.util.StringUtils.hasText;


@RequiredArgsConstructor
@Repository
public class ApplicationQueryRepository {

    private final JPAQueryFactory queryFactory;
    private final CategoryRepository categoryRepository;

    public ApplicationCountResponseDTO getMyApplication(Long myUid) {
        List<ApplicationResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationResponseDTO.class, category.categoryParent.id, category.categoryParent.id.count()))
                .from(category)
                .innerJoin(board)
                .on(category.id.eq(board.category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(myUid))
                .groupBy(category.categoryParent.id)
                .orderBy(category.categoryParent.id.asc())
                .fetch();

        ApplicationCountResponseDTO result = ApplicationCountResponseDTO.builder()
                .results(fetch).build();

        return result;
    }

    private BooleanExpression titleContentLike(String keyword){
        return hasText(keyword) ? board.title.contains(keyword).or(board.boardContent.contains(keyword)) : null;
    }

    private BooleanExpression approachCodeIn(List<Integer> approach){
        return isEmpty(approach) ? null : board.approach.in(approach);
    }

}
