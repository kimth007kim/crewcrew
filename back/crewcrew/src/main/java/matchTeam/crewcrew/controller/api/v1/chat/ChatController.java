package matchTeam.crewcrew.controller.api.v1.chat;


import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.chat.ChatMessageDTO;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.service.chat.ChatMessageService;
import matchTeam.crewcrew.service.chat.ChatRoomService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Controller

public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final ChatRoomService chatRoomService;
    private final UserService userService;

    @Transactional
    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO chatMessageDTO) {


        User user = userService.tokenChecker(chatMessageDTO.getToken());

        ChatRoom chatRoom = chatRoomService.isValidRoom(chatMessageDTO.getRoomId());

        chatRoomService.checkMessageSend(chatRoom.getRoomId(), user);
        if (ChatMessageDTO.MessageType.EXIT.equals(chatMessageDTO.getType())){
            chatMessageDTO.setContent(user.getNickname() + "님이 퇴장하셨습니다.");
        }
        chatMessageService.saveMessage(chatRoom, user, chatMessageDTO.getContent());
        System.out.println("/sub/chat/room/" + chatMessageDTO.getRoomId());


        // TODO 여기를 DTO로 바꾸게 하는것 이 관건
        messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageDTO.getRoomId(), chatMessageDTO);
    }

}
