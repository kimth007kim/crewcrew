package matchTeam.crewcrew.repository.chat;

import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage,Long> {
    List<ChatMessage> findByChatRoom(ChatRoom chatRoom);
    List<ChatMessage> findByChatRoomOrderByCreatedDateDesc(ChatRoom chatRoom,Pageable pageable);
    List<ChatMessage> findByChatRoomAndUser(ChatRoom chatRoom, User user);

//    @Modifying
//    @Query("UPDATE ChatMessage c set c.readCnt = 0 where c.user not :user")
//    void updateReadCnt(@Param("readCnt") int readCnt);


}
