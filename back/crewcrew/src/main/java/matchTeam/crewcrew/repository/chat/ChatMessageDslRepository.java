package matchTeam.crewcrew.repository.chat;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.chat.*;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

import static matchTeam.crewcrew.entity.chat.QChatMessage.chatMessage;
import static matchTeam.crewcrew.entity.chat.QChatRoom.chatRoom;
import static matchTeam.crewcrew.entity.board.QBoard.board;

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

    public Long createRoom(User publisher, User subscriber) {
        queryFactory.insert(chatRoom)
                .set(chatRoom.publisher,publisher)
                .set(chatRoom.subscriber,subscriber)
                .set(chatRoom.publisherIn,1)
                .set(chatRoom.subscriberIn,1)
                .execute();

        return 1L;
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

    public Long search(String target, UUID roomId, Long pid, Long sid) {
        BooleanBuilder builder = new BooleanBuilder();
        System.out.println("--------" + target + sid + " " + pid);
        if (pid != null && sid == null) {
            builder.or((chatRoom.publisher.nickname.contains(target))
                    .or(chatRoom.board.title.contains(target))
                    .or(chatRoom.board.category.categoryName.contains(target)));
        }
        if (pid == null && sid != null) {
            builder.or((chatRoom.subscriber.nickname.contains(target))
                    .or(chatRoom.board.title.contains(target))
                    .or(chatRoom.board.category.categoryName.contains(target)));
        }
        Long result = queryFactory
                .select(chatRoom)
                .from(chatRoom)
                .where(chatRoom.roomId.eq(roomId),builder)
//                        (chatRoom.board.title.contains(target)))
                .fetchCount();
        System.out.println("---------------------------------" + result);
        return result;
    }


    public int viewLeft(UUID roomId, Long otherId) {
        if (otherId == null) {
            List<ChatMessageLeftCountDTO> content = queryFactory
                    .select(Projections.constructor(ChatMessageLeftCountDTO.class, chatMessage))
                    .from(chatMessage)
                    .where(chatMessage.chatRoom.roomId.eq(roomId).and(chatMessage.user.uid.isNull()).and(chatMessage.readCnt.eq(1)))
                    .fetch();

            //cnt 따로 뽑는다.
            return content.size();
        }
        List<ChatMessageLeftCountDTO> content = queryFactory
                .select(Projections.constructor(ChatMessageLeftCountDTO.class, chatMessage))
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
                .orderBy(chatMessage.messageId.desc())
                .limit(1)
                .fetchOne();
        return message;
    }

    public void exitChatRoomPublisher(UUID roomId, Long uid) {
        long execute = queryFactory
                .update(chatRoom)
                .set(chatRoom.publisherIn, 0)
                .where(chatRoom.publisher.uid.eq(uid).and(chatRoom.roomId.eq(roomId)))
                .execute();
    }

    public void exitChatRoomSubscriber(UUID roomId, Long uid) {
        long execute = queryFactory
                .update(chatRoom)
                .set(chatRoom.subscriberIn, 0)
                .where(chatRoom.subscriber.uid.eq(uid).and(chatRoom.roomId.eq(roomId)))
                .execute();
    }

    public void exitChatMessage(UUID roomId, Long uid) {
        long execute = queryFactory
                .update(chatMessage)
                .set(chatMessage.user, (User) null)
                .where(chatMessage.user.uid.eq(uid).and(chatMessage.chatRoom.roomId.eq(roomId)))
                .execute();
    }


    public void deleteChatRoom(UUID roomId) {
        long execute = queryFactory
                .delete(chatRoom)
                .where(chatRoom.roomId.eq(roomId))
                .execute();
    }

    public void deleteChatMessage(UUID roomId) {
        long execute = queryFactory
                .delete(chatMessage)
                .where(chatMessage.chatRoom.roomId.eq(roomId))
                .execute();
    }

}
