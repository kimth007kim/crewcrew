package matchTeam.crewcrew.repository.chat;

import matchTeam.crewcrew.dto.chat.RoomListResponseDTO;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage,Long> {
    List<ChatMessage> findByChatRoom(ChatRoom chatRoom);
    List<ChatMessage> findByChatRoomOrderByCreatedDateDesc(ChatRoom chatRoom,Pageable pageable);
    List<ChatMessage> findByChatRoomAndUser(ChatRoom chatRoom, User user);

//    @Query("Select m FROM ChatRoom inner join m.user t ",ChatROom.class )
//    List<RoomListResponseDTO>


    @Transactional
    @Modifying
    @Query("UPDATE ChatMessage c set c.readCnt= 0 where c.chatRoom= :chatRoom and not c.user=:user")
    void updateReadCnt(@Param("chatRoom") ChatRoom chatRoom ,@Param("user") User user);


}
