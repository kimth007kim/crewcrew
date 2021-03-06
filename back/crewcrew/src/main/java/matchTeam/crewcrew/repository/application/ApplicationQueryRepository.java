package matchTeam.crewcrew.repository.application;


import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.*;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

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
     * @return
     */
    public ApplicationCountResponseDTO getMyApplication(User req) {
        List<ApplicationResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationResponseDTO.class, category.categoryParent.id, category.categoryParent.id.count()))
                .from(category)
                .innerJoin(board)
                .on(category.id.eq(board.category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(req.getUid()))
                .groupBy(category.categoryParent.id)
                .orderBy(category.categoryParent.id.asc())
                .fetch();

        ApplicationCountResponseDTO result = ApplicationCountResponseDTO.builder()
                .results(fetch).build();

        return result;
    }

    /***
     * 내 참여요청의 상세 정보를 조회하는 메소드
     * @param pageable 페이징 관련 변수
     * @return
     * @return
     */
    public Page<ApplicationDetailResponseDTO> getMyApplicationDetails(User req, Long categoryParentId, Pageable pageable){
        List<ApplicationDetailResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationDetailResponseDTO.class, board, application))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(req.getUid()).and(category.categoryParent.id.eq(categoryParentId)))
                .orderBy(board.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<ApplicationDetailResponseDTO> countQuery = queryFactory
                .select(Projections.constructor(ApplicationDetailResponseDTO.class, board, application))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(req.getUid()).and(category.categoryParent.id.eq(categoryParentId)))
                .orderBy(board.createdDate.desc());

        return PageableExecutionUtils.getPage(fetch, pageable, countQuery::fetchCount);
    }

    /***
     * 참여 수락된 글 갯수 조회하는 메소드
     */
    public Long getAcceptedApplicationCnt(User req) {
        return queryFactory
                .selectDistinct(new CaseBuilder()
                        .when(board.id.count().isNull())
                        .then(0L).otherwise(board.id.count()))
                .from(board)
                .innerJoin(application)
                .on(board.id.eq(application.board.id))
                .where(application.user.uid.eq(req.getUid()).and(application.progress.eq(2)))
                .fetchOne();
    }

    /***
     * 참여수락된 게시글 조회
     * @param pageable 페이징 관련 변수
     * @return
     */
    public Page<ApplicationDetailResponseDTO> getParticipatedBoardDetails(User req, Pageable pageable){
        List<ApplicationDetailResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationDetailResponseDTO.class, board, application))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.progress.eq(2).and(application.user.uid.eq(req.getUid())))
                .orderBy(application.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<ApplicationDetailResponseDTO> countQuery = queryFactory
                .select(Projections.constructor(ApplicationDetailResponseDTO.class, board, application))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .innerJoin(application)
                .on(application.board.id.eq(board.id))
                .where(application.progress.eq(2).and(application.user.uid.eq(req.getUid())))
                .orderBy(application.createdDate.desc());

        return PageableExecutionUtils.getPage(fetch, pageable, countQuery::fetchCount);
    }

    /***
     * 참여수락된 글의 다른 사람 조회
     * @return
     */
    public List<ArrivedApplierDetailsDTO> getParticipatedBoardApplier(User req, Long boardId){
        return queryFactory
                .selectDistinct(Projections.constructor(ArrivedApplierDetailsDTO.class, user, application))
                .from(application)
                    .innerJoin(user)
                    .on(application.user.uid.eq(user.uid))
                .where(application.progress.eq(2).and(application.board.id.eq(boardId)).and(application.user.uid.ne(req.getUid())))
                .orderBy(application.createdDate.asc())
                .fetch();
    }

    /***
     * 중복 지원을 방지하기 위한 메소드
     * @return
     */
    public Long checkDuplicateApply(User req, ApplicationSaveRequestDTO info){
        return queryFactory
                .select(application)
                .from(application)
                .where(application.user.uid.eq(req.getUid())
                        .and(application.board.id.eq(info.getBoardId())))
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

    public Long getTheNumberOfWaiting(User req, Long boardId){
        return queryFactory
                .select(board.id.count())
                .from(user)
                .innerJoin(application)
                .on(application.user.uid.eq(user.uid))
                .innerJoin(board)
                .on(board.id.eq(application.board.id))
                .where(application.progress.eq(1).and(board.id.eq(boardId).and(board.user.uid.eq(req.getUid()))))
                .groupBy(board.id)
                .fetchOne();
    }


    public Long getMyCrewCount(User req){
        return queryFactory
                .select(new CaseBuilder()
                        .when(board.id.count().isNull())
                        .then(0L).otherwise(board.id.count()))
                .from(board)
                .where(board.user.uid.eq(req.getUid()).and(board.viewable.eq(false)))
                .fetchOne();
    }

    public Page<BoardResponseDTO> getMyCrewCountDetails(User req, Pageable pageable){
        List<BoardResponseDTO> fetch = queryFactory
                .select(Projections.constructor(BoardResponseDTO.class, board))
                .from(board)
                .where(
                        board.user.uid.eq(req.getUid()).
                                and(board.viewable.eq(false)))
                .orderBy(board.expiredDate.asc(), board.createdDate.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<BoardResponseDTO> countQuery = queryFactory
                .select(Projections.constructor(BoardResponseDTO.class, board))
                .from(board)
                .where(
                        board.user.uid.eq(req.getUid()).
                                and(board.viewable.eq(false)))
                .orderBy(board.expiredDate.asc(), board.createdDate.asc());

        return PageableExecutionUtils.getPage(fetch, pageable, countQuery::fetchCount);
    }

    public Long getParticipatedCrewCount(User req){
        return queryFactory
                .select(new CaseBuilder()
                        .when(board.id.count().isNull())
                        .then(0L).otherwise(board.id.count()))
                .from(board)
                .innerJoin(application)
                .on(board.id.eq(application.board.id))
                .where(application.user.uid.eq(req.getUid()).and(application.progress.eq(2)))
                .fetchOne();
    }

    public Page<ApplicationParticipatedDetailResponseDTO> getMyParticipatedDetails(User req, Pageable pageable){
        List<ApplicationParticipatedDetailResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationParticipatedDetailResponseDTO.class, board, application, user))
                .from(application)
                .innerJoin(user)
                .on(application.user.uid.eq(user.uid))
                .innerJoin(board)
                .on(application.board.id.eq(board.id))
                .where(
                        application.user.uid.eq(req.getUid())
                                .and(application.progress.eq(2)))
                .orderBy(board.expiredDate.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<ApplicationParticipatedDetailResponseDTO> countQuery = queryFactory
                .select(Projections.constructor(ApplicationParticipatedDetailResponseDTO.class, board, application, user))
                .from(application)
                .innerJoin(user)
                .on(application.user.uid.eq(user.uid))
                .innerJoin(board)
                .on(application.board.id.eq(board.id))
                .where(
                        application.user.uid.eq(req.getUid())
                                .and(application.progress.eq(2)))
                .orderBy(board.expiredDate.asc());

        return PageableExecutionUtils.getPage(fetch, pageable, countQuery::fetchCount);
    }

    public List<ArrivedApplierDetailsDTO> getAnotherApplier(User req, Long boardId){
        return queryFactory
                .selectDistinct(Projections.constructor(ArrivedApplierDetailsDTO.class, user, application))
                .from(user)
                .innerJoin(application)
                .on(application.user.uid.eq(user.uid))
                .where(application.progress.eq(2)
                        .and(application.user.uid.ne(req.getUid()))
                        .and(application.board.id.eq(boardId)))
                .orderBy(application.createdDate.desc())
                .fetch();
    }

    public ApplicationCountResponseDTO getMyRecruitingCount(User req) {
        List<ApplicationResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationResponseDTO.class, category.categoryParent.id, category.categoryParent.id.count()))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .where(board.viewable.eq(true).and(board.user.uid.eq(req.getUid())))
                .groupBy(category.categoryParent.id)
                .fetch();

        ApplicationCountResponseDTO result = ApplicationCountResponseDTO.builder()
                .results(fetch).build();

        return result;
    }

    public Page<MyRecruitingBoardResponseDTO> getRecruitingDetails(User req, Long categoryParentId, Pageable pageable){
        List<MyRecruitingBoardResponseDTO> fetch = queryFactory
                .select(Projections.constructor(MyRecruitingBoardResponseDTO.class, board))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .where(board.viewable.eq(true).and(board.user.uid.eq(req.getUid())).and(category.categoryParent.id.eq(categoryParentId)))
                .orderBy(board.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        
        JPAQuery<MyRecruitingBoardResponseDTO> countQuery = queryFactory
                .select(Projections.constructor(MyRecruitingBoardResponseDTO.class, board))
                .from(board)
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .where(board.viewable.eq(true).and(board.user.uid.eq(req.getUid())).and(category.categoryParent.id.eq(categoryParentId)))
                .orderBy(board.createdDate.desc());

        return PageableExecutionUtils.getPage(fetch, pageable, countQuery::fetchCount);
    }

    public Long getWaitingCrewCount(User req, Long boardId, Integer statusCode) {
        return queryFactory
                .select(new CaseBuilder()
                        .when(application.user.uid.count().isNull())
                        .then(0L).otherwise(board.id.count()))
                .from(board)
                .innerJoin(application)
                .on(board.id.eq(application.board.id))
                .where(board.id.eq(boardId).and(board.user.uid.eq(req.getUid())).and(application.progress.eq(statusCode)))
                .groupBy(board.id)
                .fetchOne();
    }

    public ApplicationCountResponseDTO getAcceptedCrewCountByUid(Long uid) {
        List<ApplicationResponseDTO> fetch = queryFactory
                .select(Projections.constructor(ApplicationResponseDTO.class, category.categoryParent.id, category.categoryParent.id.count()))
                .from(application)
                .innerJoin(board)
                .on(application.board.id.eq(board.id))
                .innerJoin(category)
                .on(board.category.id.eq(category.id))
                .where(application.user.uid.eq(uid).and(application.progress.eq(2)))
                .groupBy(category.categoryParent.id)
                .fetch();

        ApplicationCountResponseDTO result = ApplicationCountResponseDTO.builder()
                .results(fetch).build();

        return result;
    }

    public Page<BoardPageDetailResponseDTO> getAcceptedBoardByUid(Long uid, Pageable pageable) {
        List<BoardPageDetailResponseDTO> content = queryFactory
                .select(Projections.constructor(BoardPageDetailResponseDTO.class, board))
                .from(application)
                .innerJoin(board)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(uid).and(application.progress.eq(2)))
                .orderBy(board.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Board> countQuery = queryFactory
                .select(board)
                .from(application)
                .innerJoin(board)
                .on(application.board.id.eq(board.id))
                .where(application.user.uid.eq(uid).and(application.progress.eq(2)))
                .orderBy(board.createdDate.desc());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }


    public List<ArrivedApplierDetailsDTO> getWaitingCrewDetails(User req, Long boardId, Integer statusCode) {
        return queryFactory
                .select(Projections.constructor(ArrivedApplierDetailsDTO.class, user, application))
                .from(application)
                .innerJoin(board)
                .on(board.id.eq(application.board.id))
                .innerJoin(user)
                .on(application.user.uid.eq(user.uid))
                .where(board.id.eq(boardId).and(board.user.uid.eq(req.getUid())).and(application.progress.eq(statusCode)))
                .fetch();
    }

    public Long getMyExpiredBoardApplierCount(User req, Long boardId) {
        return queryFactory
                .select(new CaseBuilder()
                        .when(application.user.uid.count().isNull())
                        .then(0L).otherwise(board.id.count()))
                .from(application)
                .innerJoin(user)
                .on(application.user.uid.eq(user.uid))
                .innerJoin(board)
                .on(application.board.id.eq(board.id))
                .where(board.id.eq(boardId).and(board.user.uid.eq(req.getUid())).and(board.viewable.eq(false)).and(application.progress.eq(2)))
                .groupBy(board.id)
                .fetchOne();
    }

    public List<ArrivedApplierDetailsDTO> getMyExpiredBoardApplierDetails(User req, Long boardId) {
        return queryFactory
                .select(Projections.constructor(ArrivedApplierDetailsDTO.class, user, application))
                .from(application)
                .innerJoin(user)
                .on(application.user.uid.eq(user.uid))
                .innerJoin(board)
                .on(application.board.id.eq(board.id))
                .where(board.id.eq(boardId).and(board.user.uid.eq(req.getUid())).and(board.viewable.eq(false)).and(application.progress.eq(2)))
                .orderBy(application.createdDate.asc())
                .fetch();
    }


    private BooleanExpression approachCodeIn(List<Integer> approach){
        return isEmpty(approach) ? null : board.approach.in(approach);
    }


}
