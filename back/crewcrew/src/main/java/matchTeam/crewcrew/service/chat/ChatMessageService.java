package matchTeam.crewcrew.service.chat;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.test.Member;
import matchTeam.crewcrew.repository.chat.ChatMessageRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;

    public void saveMessage(ChatRoom room , Member member,String content){
        ChatMessage message = ChatMessage.builder().member(member).chatRoom(room).content(content).build();
        message.setReadCnt(1);
        chatMessageRepository.save(message);
    }




//    public List<ChatMessage> findChatByMember(){
//
//    }

}
