package matchTeam.crewcrew.service.chat;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.chat.ChatMessageResponseDTO;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.chat.ChatMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;

//    public List<ChatMessageResponseDTO> saveMessage(ChatRoom room, User user, String content) {
    @Transactional
    public void saveMessage(ChatRoom room, User user, String content) {
        ChatMessage message = ChatMessage.builder().user(user).chatRoom(room).content(content).build();
        message.setReadCnt(1);
        chatMessageRepository.save(message);
//        List<ChatMessage> messages = new ArrayList<>();
//        messages.add(message);

//        List<ChatMessageResponseDTO> result = chatRoomService.messageToResponse(room.getRoomId(), messages);


//        return result;
    }



//    public List<ChatMessage> findChatByMember(){
//
//    }

}
