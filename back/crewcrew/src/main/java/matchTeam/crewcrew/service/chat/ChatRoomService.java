package matchTeam.crewcrew.service.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.chat.ChatMessageResponseDTO;
import matchTeam.crewcrew.dto.chat.ChatRoomCreateDTO;
import matchTeam.crewcrew.dto.chat.ChatRoomResponseDTO;
import matchTeam.crewcrew.dto.chat.UserProfileDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.test.Member;
import matchTeam.crewcrew.entity.user.test.MemberRepository;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.chat.ChatMessageRepository;
import matchTeam.crewcrew.repository.chat.ChatRoomRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
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
            Long bid = null;
            ChatRoom room = chatRooms.get(i);
            Board board = room.getBoard();
            if (board != null) {
                bid = board.getId();
            }
            Member publisher = room.getPublisher();
            if (publisher != null) {
                pid = publisher.getId();
            }
            Member subscriber = room.getSubscriber();
            if (subscriber != null) {
                sid = subscriber.getId();
            }
            ChatRoomResponseDTO chatRoomResponseDTO = new ChatRoomResponseDTO(room.getRoomId(), bid, pid, sid, room.getCreatedDate());
            result.add(chatRoomResponseDTO);
        }
        Collections.reverse(result);
        return result;
    }

    public List<ChatMessageResponseDTO> messageByRoomId(UUID roomId) {
        ChatRoom room = isValidRoom(roomId);
        List<ChatMessage> messages = chatMessageRepository.findByChatRoom(room);
        List<ChatMessageResponseDTO> result =messageToResponse(roomId, messages);
        return result;

    }


    public List<ChatMessageResponseDTO> messageByRoomId(UUID roomId, int page, int size) {
        ChatRoom room = isValidRoom(roomId);
        Pageable pageable = PageRequest.of(page, size);
        List<ChatMessage> messages = chatMessageRepository.findByChatRoomOrderByCreatedDateDesc(room, pageable);
        List<ChatMessageResponseDTO> result =messageToResponse(roomId, messages);
        return result;
    }


    public List<ChatMessageResponseDTO> messageToResponse(UUID roomId, List<ChatMessage> messages) {
        ChatRoom room = isValidRoom(roomId);
        Member member1 = room.getPublisher();
        Long mid1 = member1.getId();
        Member member2 = room.getSubscriber();
        Long mid2 = member2.getId();

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
            if (uid == mid1) {
                UserProfileDTO publisher = new UserProfileDTO(mid1, member1.getNickName(), member1.getImage());
                UserProfileDTO subscriber = new UserProfileDTO(mid2, member2.getNickName(), member2.getImage());
                ChatMessageResponseDTO chatMessageResponseDTO = new ChatMessageResponseDTO(message.getMessageId(), roomId, publisher, subscriber, message.getContent(), message.getCreatedDate(), message.getReadCnt());
                result.add(chatMessageResponseDTO);
            } else {
                UserProfileDTO publisher = new UserProfileDTO(mid2, member2.getNickName(), member2.getImage());
                UserProfileDTO subscriber = new UserProfileDTO(mid1, member1.getNickName(), member1.getImage());
                ChatMessageResponseDTO chatMessageResponseDTO = new ChatMessageResponseDTO(message.getMessageId(), roomId, publisher, subscriber, message.getContent(), message.getCreatedDate(), message.getReadCnt());
                result.add(chatMessageResponseDTO);
            }
        }
        Collections.reverse(result);
        return result;
    }

    public List<ChatRoom> listRoom(Long uid) {
        Member member = memberRepository.findById(uid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        List<ChatRoom> rooms = chatRoomRepository.findBySubscriberOrPublisher(member, member);
        return rooms;
    }

    public List<ChatRoomResponseDTO> roomlist(Long uid) {
        Member member = memberRepository.findById(uid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        List<ChatRoom> rooms = chatRoomRepository.findBySubscriberOrPublisher(member, member);
        int length = rooms.size();

        System.out.println(length + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        List<ChatRoomResponseDTO> result = new ArrayList<>();
        if (length == 0)
            return result;
        for (int i = 0; i < length; i++) {
            Long bid = null;
            Long pid = null;
            Long sid = null;
            ChatRoom room = rooms.get(i);

            Board board = room.getBoard();
            if (board != null) {
                bid = board.getId();
            }
            Member publisher = room.getPublisher();
            if (publisher != null) {
                pid = publisher.getId();
            }
            Member subscriber = room.getSubscriber();
            if (subscriber != null) {
                sid = subscriber.getId();
            }
            ChatRoomResponseDTO chatRoomResponseDTO = new ChatRoomResponseDTO(room.getRoomId(), bid, pid, sid, room.getCreatedDate());
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
        Optional<Board> board = boardRepository.findById(chatRoomCreateDTO.getBoard_id());
//        Board board = boardRepository.findById(chatRoomCreateDTO.getBoard_id()).orElseThrow(()->new CrewException(ErrorCode.NOT_EXIST_BOARD_IN_ID))
        Member pubs = memberRepository.findById(chatRoomCreateDTO.getPublisher_id()).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        Member subs = memberRepository.findById(chatRoomCreateDTO.getSubscriber_id()).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        Board now = null;
        if (board.isPresent()) {
            now = board.get();
        }
        Optional<ChatRoom> already = chatRoomRepository.findBySubscriberAndPublisherAndBoard(subs, pubs, now);


        if (already.isPresent()) {
            ChatRoom chatRoom = already.get();
            return chatRoom;
        }

        if (board.isEmpty()) {

            ChatRoom chatRoom = ChatRoom.builder().publisher(pubs).subscriber(subs).board(null).build();
            chatRoomRepository.save(chatRoom);
            return chatRoom;
        } else {
            ChatRoom chatRoom = ChatRoom.builder().publisher(pubs).subscriber(subs).board(board.get()).build();
            chatRoomRepository.save(chatRoom);
            return chatRoom;
        }

    }


//    //MemberId로 모든 채팅방 체크
//    public void findChatMessageByID(Member meber){
//
//    }

}
