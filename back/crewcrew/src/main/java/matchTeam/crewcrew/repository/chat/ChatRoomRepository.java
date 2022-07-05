package matchTeam.crewcrew.repository.chat;

import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {
    List<ChatRoom> findAll();

    Optional<ChatRoom> findById(UUID roomId);
    List<ChatRoom> findBySubscriberOrPublisher(User member1, User member2);
    Optional<ChatRoom> findByRoomIdAndSubscriberOrPublisher(UUID roomId, User member1, User member2);
    Optional<ChatRoom> findByRoomIdAndPublisher(UUID roomId, User user);
    Optional<ChatRoom> findByRoomIdAndSubscriber(UUID roomId, User user);
    Optional<ChatRoom> findBySubscriberAndPublisherAndBoard(User sub, User pub, Board board);
}
