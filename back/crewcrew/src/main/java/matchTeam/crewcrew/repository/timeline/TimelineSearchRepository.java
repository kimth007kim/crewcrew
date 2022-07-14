package matchTeam.crewcrew.repository.timeline;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.timeline.TimelinePageDetailResponseDTO;
import matchTeam.crewcrew.entity.announcement.Announcement;
import matchTeam.crewcrew.entity.bookmark.Bookmark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static matchTeam.crewcrew.entity.announcement.QAnnouncement.announcement;
import static matchTeam.crewcrew.entity.board.QBoard.board;
import static matchTeam.crewcrew.entity.bookmark.QBookmark.bookmark;

@RequiredArgsConstructor
@Repository
public class TimelineSearchRepository {
    private final JPAQueryFactory queryFactory;

    public Page<TimelinePageDetailResponseDTO> search(Long userId, Pageable pageable, Integer filter){

        BooleanExpression chkUser = null;
        BooleanExpression chkAnnounceType = null;

        switch (filter){
            case 0:
                chkUser = announcement.leader.uid.eq(userId).and(announcement.announceType.eq(1))
                        .or(announcement.applicant.uid.eq(userId).and(announcement.announceType.eq(0)))
                        .or(announcement.applicant.uid.eq(userId).and(announcement.announceType.eq(2)))
                        .or(announcement.leader.uid.eq(userId).and(announcement.announceType.eq(3)));
                chkAnnounceType = announcement.isNotNull();
                break;
            case 1:
                chkUser = announcement.leader.uid.eq(userId);
                chkAnnounceType = announcement.announceType.eq(1);
                break;
            case 2:
                chkUser = announcement.applicant.uid.eq(userId);
                chkAnnounceType = announcement.announceType.eq(0);
                break;
            case 3:
                chkUser = announcement.applicant.uid.eq(userId);
                chkAnnounceType = announcement.announceType.eq(2);
                break;
            case 4:
                chkUser = announcement.leader.uid.eq(userId);
                chkAnnounceType = announcement.announceType.eq(3);
                break;
        }

        List<TimelinePageDetailResponseDTO> content = queryFactory
                .select(Projections.constructor(TimelinePageDetailResponseDTO.class, announcement))
                .from(announcement)
                .where(
                        chkUser, chkAnnounceType
                ).offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(announcement.createdDate.desc())
                .fetch();

        JPAQuery<Announcement> countQuery = queryFactory
                .select(announcement)
                .from(announcement)
                .where(
                        chkUser, chkAnnounceType
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }
}
