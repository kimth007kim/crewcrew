package matchTeam.crewcrew.service.chat;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.chat.ChatMessageResponseDTO;
import matchTeam.crewcrew.dto.chat.ChatRoomCreateDTO;
import matchTeam.crewcrew.dto.chat.ChatRoomResponseDTO;
import matchTeam.crewcrew.dto.user.example.UserResponseDto;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.entity.user.test.Member;
import matchTeam.crewcrew.entity.user.test.MemberRepository;
import matchTeam.crewcrew.repository.chat.ChatMessageRepository;
import matchTeam.crewcrew.repository.chat.ChatRoomRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final ChatMessageRepository chatMessageRepository;

    public List<ChatRoomResponseDTO> findAllRoom() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAll();
        int length = chatRooms.size();
        System.out.println(length + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        List<ChatRoomResponseDTO> result = new ArrayList<>();
        if (length == 0)
            return result;
        for (int i = 0; i < length; i++) {
            Long pid = null;
            Long sid = null;
            ChatRoom room = chatRooms.get(i);
            Member publisher = room.getPublisher();
            if (publisher != null) {
                pid = publisher.getId();
            }
            Member subscriber = room.getSubscriber();
            if (subscriber != null) {
                sid = subscriber.getId();
            }
            ChatRoomResponseDTO chatRoomResponseDTO = new ChatRoomResponseDTO(room.getRoomId(), pid, sid, room.getCreatedDate());
            result.add(chatRoomResponseDTO);
        }
        Collections.reverse(result);
        return result;
    }

    public List<ChatMessageResponseDTO> messageByRoomId(UUID roomId) {
        ChatRoom room = isValidRoom(roomId);
        List<ChatMessage> messages = chatMessageRepository.findByChatRoom(room);
        int length = messages.size();
        List<ChatMessageResponseDTO> result = new ArrayList<>();
        if (length == 0)
            return result;
        for (int i = 0; i < length; i++) {
            ChatMessage message = messages.get(i);
            Long uid = null;
            Member member = message.getMember();
            if (member != null) {
                uid = member.getId();
            }
            ChatMessageResponseDTO chatMessageResponseDTO = new ChatMessageResponseDTO(message.getMessageId(), roomId,uid, message.getContent(),message.getCreatedDate(), message.getReadCnt());
            result.add(chatMessageResponseDTO);
        }
        Collections.reverse(result);
        return result;
    }
    public List<ChatRoomResponseDTO> roomlist(Long uid) {
        Member member = memberRepository.findById(uid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        List<ChatRoom> rooms = chatRoomRepository.findBySubscriberOrPublisher(member,member);
        int length = rooms.size();
        System.out.println(length + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        List<ChatRoomResponseDTO> result = new ArrayList<>();
        if (length == 0)
            return result;
        for (int i = 0; i < length; i++) {
            Long pid = null;
            Long sid = null;
            ChatRoom room = rooms.get(i);
            Member publisher = room.getPublisher();
            if (publisher != null) {
                pid = publisher.getId();
            }
            Member subscriber = room.getSubscriber();
            if (subscriber != null) {
                sid = subscriber.getId();
            }
            ChatRoomResponseDTO chatRoomResponseDTO = new ChatRoomResponseDTO(room.getRoomId(), pid, sid, room.getCreatedDate());
            result.add(chatRoomResponseDTO);
        }
        Collections.reverse(result);
        return result;
    }

    public ChatRoom isValidRoom(UUID roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(() -> new CrewException(ErrorCode.ACCESS_DENIED));
        return chatRoom;
    }

    public ChatRoom createChatRoom(ChatRoomCreateDTO chatRoomCreateDTO) {
        Member pubs = memberRepository.findById(chatRoomCreateDTO.getPub()).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        Member subs = memberRepository.findById(chatRoomCreateDTO.getSub()).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        ChatRoom chatRoom = ChatRoom.builder().publisher(pubs).subscriber(subs).build();
        chatRoomRepository.save(chatRoom);
        return chatRoom;
    }


//    //MemberId로 모든 채팅방 체크
//    public void findChatMessageByID(Member meber){
//
//    }

}
