package matchTeam.crewcrew.controller.api.v1.chat;


import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.chat.ChatMessageDTO;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.test.Member;
import matchTeam.crewcrew.entity.user.test.MemberRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.service.chat.ChatMessageService;
import matchTeam.crewcrew.service.chat.ChatRoomService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@RequiredArgsConstructor
@Controller

public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final ChatRoomService chatRoomService;
    private final MemberRepository memberRepository;

    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO chatMessageDTO) {
        if (ChatMessageDTO.MessageType.ENTER.equals(chatMessageDTO.getType()))
            chatMessageDTO.setContent(chatMessageDTO.getUid() + "님이 입장하셨습니다.");


        Member member = memberRepository.findById(chatMessageDTO.getUid()).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        System.out.println(member.getId());
        ChatRoom chatRoom = chatRoomService.isValidRoom(chatMessageDTO.getRoomId());
        System.out.println(chatRoom.getRoomId());

        chatMessageService.saveMessage(chatRoom, member, chatMessageDTO.getContent());
        System.out.println("/sub/chat/room/"+chatMessageDTO.getRoomId());
        messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageDTO.getRoomId(), chatMessageDTO);
    }
}
