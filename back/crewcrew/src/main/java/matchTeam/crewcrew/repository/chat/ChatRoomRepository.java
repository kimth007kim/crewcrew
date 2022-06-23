package matchTeam.crewcrew.repository.chat;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.chat.ChatRoom;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Repository
public class ChatRoomRepository {
    private Map<String, ChatRoom> chatRoomMap;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        List<ChatRoom> chatRooms = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRoomMap.get(roomId);
    }

    public ChatRoom createChatRoom(String name) {
        ChatRoom chatRoom = ChatRoom.create(name);
        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

}
