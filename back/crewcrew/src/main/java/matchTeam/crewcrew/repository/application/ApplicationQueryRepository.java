package matchTeam.crewcrew.repository.application;


import com.querydsl.core.dml.UpdateClause;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.*;
import matchTeam.crewcrew.entity.application.QApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

import static matchTeam.crewcrew.entity.board.QBoard.board;
import static matchTeam.crewcrew.entity.board.QCategory.category;
import static matchTeam.crewcrew.entity.application.QApplication.application;
import static matchTeam.crewcrew.entity.user.QUser.user;
import static org.springframework.util.CollectionUtils.isEmpty;


@RequiredArgsConstructor
@Repository
public class ApplicationQueryRepository {

    private final JPAQueryFactory queryFactory;

    /****
     * 내가 참여한 지원서 보기에 대해 조회
     * @param reqUid 내가 참여요청한 지원서를 보기를 요청한 사용자의 uid
     * @return
     */
    public ApplicationCountResponseDTO getMyApplication(Long reqUid) {
        List<ApplicationResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationResponseDTO.class, category.categoryParent.id, category.categoryParent.id.count()))
                .from(category)
                .innerJoin(board)
                .on(category.id.eq(board.category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(reqUid))
                .groupBy(category.categoryParent.id)
                .orderBy(category.categoryParent.id.asc())
                .fetch();

        ApplicationCountResponseDTO result = ApplicationCountResponseDTO.builder()
                .results(fetch).build();

        return result;
    }

    /***
     * 내 참여요청의 상세 정보를 조회하는 메소드
     * @param detailSpecs 상세정보를 요구하는 요청사항을 담은 specification
     * @param pageable 페이징 관련 변수
     * @return
     */
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

    /***
     * 내게 도착한 요청을 조회하는 메소드
     * @param reqUid 내게 도착한 참여요청 조회를 요구하는 사용자의 uid
     * @return
     */
    public ApplicationCountResponseDTO getArrivedApplication(Long reqUid) {
        List<ApplicationResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationResponseDTO.class, category.categoryParent.id, category.categoryParent.id.count()))
                .from(category)
                .innerJoin(board)
                .on(category.id.eq(board.category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(board.user.uid.eq(reqUid))
                .groupBy(category.categoryParent.id)
                .orderBy(category.categoryParent.id.asc())
                .fetch();

        ApplicationCountResponseDTO result = ApplicationCountResponseDTO.builder()
                .results(fetch).build();

        return result;
    }

    /***
     * 내게 도착한 요청의 상세 정보를 조회하는 메소드
     * @param detailSpecs 상세정보를 요구하는 요청사항을 담은 specification
     * @param pageable 페이징 관련 변수
     * @return
     */
    public Page<ApplicationDetailResponseDTO> getArrivedApplicationDetails(ApplicationDetailSpecs detailSpecs, Pageable pageable){
        List<ApplicationDetailResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationDetailResponseDTO.class, board, application))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.progress.eq(1).and(board.user.uid.eq(detailSpecs.getUid()).and(category.categoryParent.id.eq(detailSpecs.getCategoryParentId()))))
                .orderBy(application.createdDate.desc())
                .fetch();

        JPAQuery<ApplicationDetailResponseDTO> countQuery = queryFactory
                .select(Projections.constructor(ApplicationDetailResponseDTO.class, board, application))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.progress.eq(1).and(board.user.uid.eq(detailSpecs.getUid()).and(category.categoryParent.id.eq(detailSpecs.getCategoryParentId()))))
                .orderBy(application.createdDate.desc());

        return PageableExecutionUtils.getPage(fetch, pageable, countQuery::fetchCount);
    }

    /***
     * 도착한 신청서를 작성한 사람을 조회
     * @param specs - 검색 조건
     * @return
     */
    public List<ArrivedApplierDetailsDTO> getArrivedApplier(ApplicationApplierSpecs specs){
        return queryFactory
                .selectDistinct(Projections.constructor(ArrivedApplierDetailsDTO.class, user, application))
                .from(user)
                    .innerJoin(application)
                    .on(application.user.uid.eq(user.uid))
                    .innerJoin(board)
                    .on(board.id.eq(application.board.id))
                .where(application.progress.eq(1).and(board.id.eq(specs.getBoardId()).and(board.user.uid.eq(specs.getUid()))))
                .orderBy(application.createdDate.desc())
                .fetch();
    }

    /***
     * 중복 지원을 방지하기 위한 메소드
     * @return
     */
    public Long checkDuplicateApply(ApplicationSaveRequestDTO req){
        return queryFactory
                .select(application)
                .from(application)
                .where(application.user.uid.eq(req.getUid())
                        .and(application.board.id.eq(req.getBoardId())))
                .fetchCount();
    }


    /* 벌크연산 때문에 엔티티에 직접 update 되지 않음. 또한 한번에 바꾸는 것이 아니므로 굳이 update를 사용할 필요가 없다 @Transactional
    public void updateApply(UpdateApplyRequestDTO request){
        queryFactory
                .update(application)
                .set(application.progress, ApplicationStatus.from(request.getStatus()).getStatusCode())
                .where(application.id.eq(request.getApId()))
                .execute();
    }*/

    public Long getTheNumberOfWaiting(ApplicationApplierSpecs specs){
        return queryFactory
                .select(board.id.count())
                .from(user)
                .innerJoin(application)
                .on(application.user.uid.eq(user.uid))
                .innerJoin(board)
                .on(board.id.eq(application.board.id))
                .where(application.progress.eq(1).and(board.id.eq(specs.getBoardId()).and(board.user.uid.eq(specs.getUid()))))
                .groupBy(board.id)
                .fetchOne();
    }

    private BooleanExpression approachCodeIn(List<Integer> approach){
        return isEmpty(approach) ? null : board.approach.in(approach);
    }


}
