package matchTeam.crewcrew.repository.chat;

import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.test.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {
    List<ChatRoom> findAll();

    Optional<ChatRoom> findById(UUID roomId);
    List<ChatRoom> findBySubscriberOrPublisher(Member member1,Member member2);
}
