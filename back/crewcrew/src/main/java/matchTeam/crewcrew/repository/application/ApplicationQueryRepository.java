package matchTeam.crewcrew.repository.application;


import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.*;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static matchTeam.crewcrew.entity.board.QBoard.board;
import static matchTeam.crewcrew.entity.board.QCategory.category;
import static matchTeam.crewcrew.entity.application.QApplication.application;
import static org.springframework.util.CollectionUtils.isEmpty;


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

    public Page<ApplicationDetailResponseDTO> getMyApplicationDetails(ApplicationDetailSpecs detailSpecs, Pageable pageable){
        List<ApplicationDetailResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationDetailResponseDTO.class, board, application))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(detailSpecs.getUid()).and(category.categoryParent.id.eq(detailSpecs.getCategoryParentId())))
                .orderBy(board.createdDate.desc())
                .fetch();

        JPAQuery<ApplicationDetailResponseDTO> countQuery = queryFactory
                .select(Projections.constructor(ApplicationDetailResponseDTO.class, board, application))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(detailSpecs.getUid()).and(category.categoryParent.id.eq(detailSpecs.getCategoryParentId())))
                .orderBy(board.createdDate.desc());

        return PageableExecutionUtils.getPage(fetch, pageable, countQuery::fetchCount);
    }

    private BooleanExpression approachCodeIn(List<Integer> approach){
        return isEmpty(approach) ? null : board.approach.in(approach);
    }

}
