package matchTeam.crewcrew.repository.chat;

import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {
    List<ChatRoom> findAll();

    Optional<ChatRoom> findById(UUID roomId);

    List<ChatRoom> findBySubscriberOrPublisher(User member1, User member2);
    void deleteChatRoomByRoomId(UUID roomId);

    @Query("select c from ChatRoom c where c.subscriber=:user and c.subscriberIn=1")
    List<ChatRoom> findSubscriber(@Param("user") User user);

    @Query("select c from ChatRoom c where c.publisher=:user and c.publisherIn=1")
    List<ChatRoom> findPublisher(@Param("user") User user);


    @Query("select c from ChatRoom c where c.roomId=:roomId  and ((c.publisher=:user and c.publisherIn=1) or  (c.subscriber=:user and c.subscriberIn=1))")
    Optional<ChatRoom> findUserInRoom(@Param("roomId") UUID roomId, @Param("user") User user);

    @Query("select c from ChatRoom c where c.roomId=:roomId  and ((c.publisher=:user and c.publisherIn=0) or  (c.subscriber=:user and c.subscriberIn=0))")
    Optional<ChatRoom> findLeftUserInRoom(@Param("roomId") UUID roomId, @Param("user") User user);


    @Query("select c from ChatRoom c where c.roomId=:roomId and (c.subscriberIn=0 or c.subscriberIn=0)")
    Optional<ChatRoom> findBothUserInRoom(@Param("roomId") UUID roomId);

    //    Optional<ChatRoom> findByRoomIdAndSubscriberOrPublisher(UUID roomId, User member1, User member2);
    Optional<ChatRoom> findByRoomIdAndPublisher(UUID roomId, User user);

    Optional<ChatRoom> findByRoomIdAndSubscriber(UUID roomId, User user);

    Optional<ChatRoom> findBySubscriberAndPublisherAndBoard(User sub, User pub, Board board);
}
