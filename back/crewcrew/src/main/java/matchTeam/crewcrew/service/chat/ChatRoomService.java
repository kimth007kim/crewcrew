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
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.chat.ChatMessageRepository;
import matchTeam.crewcrew.repository.chat.ChatRoomRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    //    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
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
            User publisher = room.getPublisher();
            if (publisher != null) {
                pid = publisher.getUid();
            }
            User subscriber = room.getSubscriber();
            if (subscriber != null) {
                sid = subscriber.getUid();
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
        List<ChatMessageResponseDTO> result = messageToResponse(roomId, messages);
        Collections.reverse(result);
        return result;

    }


    public List<ChatMessageResponseDTO> messageByRoomId(UUID roomId, int page, int size) {
        ChatRoom room = isValidRoom(roomId);
        Pageable pageable = PageRequest.of(page, size);
        List<ChatMessage> messages = chatMessageRepository.findByChatRoomOrderByCreatedDateDesc(room, pageable);
        List<ChatMessageResponseDTO> result = messageToResponse(roomId, messages);
//        Collections.reverse(result);
        return result;
    }


    public List<ChatMessageResponseDTO> messageToResponse(UUID roomId, List<ChatMessage> messages) {
        ChatRoom room = isValidRoom(roomId);
        User user1 = room.getPublisher();
        Long uid1 = user1.getUid();
        User user2 = room.getSubscriber();
        Long uid2 = user2.getUid();

        int length = messages.size();
        List<ChatMessageResponseDTO> result = new ArrayList<>();
        if (length == 0)
            return result;
        for (int i = 0; i < length; i++) {
            ChatMessage message = messages.get(i);
            Long uid = null;
            User user = message.getUser();
            if (user != null) {
                uid = user.getUid();
            }
            if (uid == uid1) {
                UserProfileDTO publisher = new UserProfileDTO(uid1, user1.getNickname(), user1.getProfileImage());
                UserProfileDTO subscriber = new UserProfileDTO(uid2, user2.getNickname(), user2.getProfileImage());
                ChatMessageResponseDTO chatMessageResponseDTO = new ChatMessageResponseDTO(message.getMessageId(), roomId, publisher, subscriber, message.getContent(), message.getCreatedDate(), message.getReadCnt());
                result.add(chatMessageResponseDTO);
            } else {
                UserProfileDTO publisher = new UserProfileDTO(uid2, user2.getNickname(), user2.getProfileImage());
                UserProfileDTO subscriber = new UserProfileDTO(uid1, user1.getNickname(), user1.getProfileImage());
                ChatMessageResponseDTO chatMessageResponseDTO = new ChatMessageResponseDTO(message.getMessageId(), roomId, publisher, subscriber, message.getContent(), message.getCreatedDate(), message.getReadCnt());
                result.add(chatMessageResponseDTO);
            }
        }
        return result;
    }

    public List<ChatRoom> listRoom(Long uid) {
        User member = userRepository.findById(uid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        List<ChatRoom> rooms = chatRoomRepository.findBySubscriberOrPublisher(member, member);
        return rooms;
    }

    public List<ChatRoomResponseDTO> roomlist(Long uid) {
        User member = userRepository.findById(uid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
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
            User publisher = room.getPublisher();
            if (publisher != null) {
                pid = publisher.getUid();
            }
            User subscriber = room.getSubscriber();
            if (subscriber != null) {
                sid = subscriber.getUid();
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
    public void findByRoomIdAndSubscriberOrPublisher(UUID roomId,User pub,User sub){
        Optional<ChatRoom> room =chatRoomRepository.findByRoomIdAndSubscriberOrPublisher(roomId,pub,sub);
       if( room.isEmpty())
           throw new CrewException(ErrorCode.CHAT_NOT_ALLOWED_USER);
    }

    public ChatRoom createChatRoom(User subs, Long board_seq) {
        Board board = boardRepository.findById(board_seq).orElseThrow(() -> new CrewException(ErrorCode.NOT_EXIST_BOARD_IN_ID));
        User pubs = board.getUser();
        Optional<ChatRoom> already = chatRoomRepository.findBySubscriberAndPublisherAndBoard(subs, pubs, board);
        if (already.isPresent()) {
            ChatRoom chatRoom = already.get();
            return chatRoom;
        }

        ChatRoom chatRoom = ChatRoom.builder().publisher(pubs).subscriber(subs).board(board).build();
        chatRoomRepository.save(chatRoom);
        return chatRoom;
    }

    public void readMessage(UUID roomId, Long uid) {
        ChatRoom room = isValidRoom(roomId);
        User publisher = room.getPublisher();
        User subscriber = room.getSubscriber();

        if (uid != publisher.getUid() && uid != subscriber.getUid()) {

            // TODO 여기를 EXCEPTION 변경
            throw new CrewException(ErrorCode.UID_NOT_EXIST);
        }
        Long another = null;

        if (uid == publisher.getUid())
            another = subscriber.getUid();
        else
            another = publisher.getUid();

        User other = userRepository.findById(another).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        List<ChatMessage> messages = chatMessageRepository.findByChatRoomAndUser(room, other);

        for (ChatMessage m : messages) {
            System.out.println(m.getContent());
            m.setReadCnt(0);
            chatMessageRepository.save(m);
        }


    }
}
