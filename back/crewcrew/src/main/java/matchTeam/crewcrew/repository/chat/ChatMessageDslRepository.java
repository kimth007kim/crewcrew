package matchTeam.crewcrew.repository.chat;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.bookmark.BookmarkResponseDTO;
import matchTeam.crewcrew.dto.chat.*;
import matchTeam.crewcrew.entity.bookmark.Bookmark;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.response.exception.board.NotExistOrderKeywordException;
import matchTeam.crewcrew.util.customException.OrderByNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static matchTeam.crewcrew.entity.application.QApplication.application;
import static matchTeam.crewcrew.entity.board.QBoard.board;
import static matchTeam.crewcrew.entity.bookmark.QBookmark.bookmark;
import static org.springframework.util.StringUtils.hasText;


import static matchTeam.crewcrew.entity.user.QUser.user;
import static matchTeam.crewcrew.entity.chat.QChatMessage.chatMessage;
import static matchTeam.crewcrew.entity.chat.QChatRoom.chatRoom;
import static matchTeam.crewcrew.entity.board.QBoard.board;
import static matchTeam.crewcrew.entity.board.QCategory.category;

@RequiredArgsConstructor
@Repository
public class ChatMessageDslRepository {
    private final JPAQueryFactory queryFactory;

    // 이부분 내가 원했던거는 select * from chat_message로 받아와지나? 한번 보려고 테스트 해본거였음
    public List<ChatMessageResponseDTO> findAllChatRoom() {
        return queryFactory.select(Projections.constructor(ChatMessageResponseDTO.class, chatMessage))
                .from(chatMessage)
                .fetch();
    }

    public Long findAnother(UUID roomId, Long userId) {
        ChatRoomByUsersDTO roomByUsersDTO = queryFactory
                .select(Projections.constructor(ChatRoomByUsersDTO.class, chatRoom))
                .from(chatRoom)
                .where(
                        chatRoom.roomId.eq(roomId))
                .fetchOne();
        if (roomByUsersDTO.getPublisherId() == userId) {
            return roomByUsersDTO.getSubscriberId();
        }
        return roomByUsersDTO.getPublisherId();
    }



    public int viewLeft(UUID roomId,Long otherId) {
        if (otherId==null){
            List<ChatMessageLeftCountDTO> content = queryFactory
                    .select( Projections.constructor(ChatMessageLeftCountDTO.class, chatMessage))
                    .from(chatMessage)
                    .where(chatMessage.chatRoom.roomId.eq(roomId).and(chatMessage.user.uid.isNull()).and(chatMessage.readCnt.eq(1)))
                    .fetch();

            //cnt 따로 뽑는다.
            return content.size();
        }
        List<ChatMessageLeftCountDTO> content = queryFactory
                .select( Projections.constructor(ChatMessageLeftCountDTO.class, chatMessage))
                .from(chatMessage)
                .where(chatMessage.chatRoom.roomId.eq(roomId).and(chatMessage.user.uid.eq(otherId)).and(chatMessage.readCnt.eq(1)))
                .fetch();

        //cnt 따로 뽑는다.
        return content.size();
    }

    public ChatMessageRecentMessageDTO lastMessage(UUID roomId) {
        ChatMessageRecentMessageDTO message = queryFactory
                .select(Projections.constructor(ChatMessageRecentMessageDTO.class, chatMessage))
                .from(chatMessage)
                .where(chatMessage.chatRoom.roomId.eq(roomId))
                .orderBy(chatMessage.createdDate.asc())
                .limit(1)
                .fetchOne();
        return message;
    }
//
//    private OrderSpecifier<?> findOrder(String order){
//        if (!hasText(order)){
//            return OrderByNull.DEFAULT;
//        }
//        else if (order.equals("recent")){
//            return board.createdDate.desc();
//        }else if (order.equals("bookmarked")){
//            return bookmark.bookmarkId.desc();
//        } else {
//            throw new NotExistOrderKeywordException();
//        }
//    }
}
