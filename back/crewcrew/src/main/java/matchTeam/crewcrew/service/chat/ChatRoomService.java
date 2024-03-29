package matchTeam.crewcrew.service.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.chat.*;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.chat.ChatMessageDslRepository;
import matchTeam.crewcrew.repository.chat.ChatMessageRepository;
import matchTeam.crewcrew.repository.chat.ChatRoomRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    //    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final ChatMessageDslRepository chatMessageDslRepository;
    private final BoardRepository boardRepository;
    private final ChatMessageRepository chatMessageRepository;

    public RoomInfoResponseDTO roomInfo(UUID roomId, User user) {
        ChatRoom room = isValidRoom(roomId);
        findByRoomIdAndSubscriberOrPublisher(roomId, user);
        RoomInfoResponseDTO roomInfo = new RoomInfoResponseDTO();

        roomInfo.setRoomId(roomId);
        if (room.getPublisher().getUid() == user.getUid())
            roomInfo.setCaptain(true);
        else
            roomInfo.setCaptain(false);


        Long otherUid = chatMessageDslRepository.findAnother(room.getRoomId(), user.getUid());
        User otherUser = null;
        if (otherUid != null) {
            otherUser = userRepository.findById(otherUid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        }

        if (otherUid == null) {
            Other another = new Other(null, null, null);
            roomInfo.setOther(another);
        } else {
            Other another = new Other(otherUid, otherUser.getNickname(), otherUser.getProfileImage());
            roomInfo.setOther(another);
        }

        Board board = room.getBoard();
        Category category = board.getCategory();

        roomInfo.setBoardSeq(board.getId());
        roomInfo.setBoardTitle(board.getTitle());
        roomInfo.setCategoryId(category.getId());
        roomInfo.setCategoryName(category.getCategoryName());
        if (room.getSubscriberIn()==0 || room.getPublisherIn()==0){
            roomInfo.setDelete(true);
        }else{
            roomInfo.setDelete(false);
        }

        return roomInfo;
    }

    public List<ChatMessageResponseDTO> messageByRoomId(UUID roomId) {
        ChatRoom room = isValidRoom(roomId);
        List<ChatMessage> messages = chatMessageRepository.findByChatRoom(room);
//        Pageable pageable = PageRequest.of(page, size);
        List<ChatMessageResponseDTO> result = messageToResponse(roomId, messages);
        Collections.reverse(result);
        return result;

    }


    public List<ChatMessageResponseDTO> messageByRoomId(UUID roomId, int page, int size) {
        ChatRoom room = isValidRoom(roomId);
        Pageable pageable = PageRequest.of(page, size);
        List<ChatMessage> messages = chatMessageRepository.findByChatRoomOrderByMessageIdDesc(room, pageable);
        List<ChatMessageResponseDTO> result = messageToResponse(roomId, messages);
//        Collections.reverse(result);
        return result;
    }


    public List<ChatMessageResponseDTO> messageToResponse(UUID roomId, List<ChatMessage> messages) {
        ChatRoom room = isValidRoom(roomId);
        Long uid1 = null;
        Long uid2 = null;
        User user1 = room.getPublisher();
        if (user1 != null)
            uid1 = user1.getUid();
        User user2 = room.getSubscriber();
        if (user2 != null)
            uid2 = user2.getUid();


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

    public List<RoomListResponseDTO> roomList(Long uid) {
        User member = userRepository.findById(uid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        List<ChatRoom> rooms = new ArrayList<>();

        List<ChatRoom> subs= chatRoomRepository.findSubscriber(member);
        List<ChatRoom> pubs= chatRoomRepository.findPublisher(member);
        for (ChatRoom s: subs)
            rooms.add(s);
        for (ChatRoom p: pubs)
            rooms.add(p);

        int length = rooms.size();

        System.out.println(length + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        List<RoomListResponseDTO> result = new ArrayList<>();
        for (int i = 0; i < length; i++) {

            RoomListResponseDTO roomList = new RoomListResponseDTO();
            ChatRoom room = rooms.get(i);
            roomList.setRoomId(room.getRoomId());
            if (room.getPublisher() == null) {
                roomList.setCaptain(false);
            }
            if (room.getPublisher() != null && room.getPublisher().getUid() == uid)
                roomList.setCaptain(true);
            else
                roomList.setCaptain(false);
            Long otherUid = chatMessageDslRepository.findAnother(room.getRoomId(), uid);
            User otherUser = null;
            if (otherUid != null) {
                otherUser = userRepository.findById(otherUid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
            }

            if (otherUid == null) {
                Other another = new Other(null, null, null);
                roomList.setOther(another);
            } else {
                Other another = new Other(otherUid, otherUser.getNickname(), otherUser.getProfileImage());
                roomList.setOther(another);
            }


            Board board = room.getBoard();
            Category category = board.getCategory();

            roomList.setBoardSeq(board.getId());
            roomList.setBoardTitle(board.getTitle());
            roomList.setCategoryId(category.getId());
            roomList.setCategoryName(category.getCategoryName());

            int left = chatMessageDslRepository.viewLeft(room.getRoomId(), otherUid);
            roomList.setUnReadCnt(Long.valueOf(left));
            ChatMessageRecentMessageDTO recentDTO = chatMessageDslRepository.lastMessage(room.getRoomId());
            if (recentDTO == null) {
                roomList.setRecentMessageTime(room.getCreatedDate());
                roomList.setRecentMessageContent(null);
            } else {
                roomList.setRecentMessageTime(recentDTO.getTime());
                roomList.setRecentMessageContent(recentDTO.getContent());
            }
            if (room.getSubscriberIn()==0 || room.getPublisherIn()==0){
                roomList.setDelete(true);
            }else{
                roomList.setDelete(false);
            }
            result.add(roomList);
        }
        result.sort(Comparator.comparing(RoomListResponseDTO::getRecentMessageTime).reversed());
        return result;
    }


    public List<RoomListResponseDTO> searchRoom(Long uid, String target) {
        User member = userRepository.findById(uid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
        List<ChatRoom> rooms = new ArrayList<>();

        List<ChatRoom> subs= chatRoomRepository.findSubscriber(member);
        List<ChatRoom> pubs= chatRoomRepository.findPublisher(member);
        for (ChatRoom s: subs)
            rooms.add(s);
        for (ChatRoom p: pubs)
            rooms.add(p);

        int length = rooms.size();
        System.out.println(length + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        List<RoomListResponseDTO> result = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            boolean input = false;
            ChatRoom room = rooms.get(i);
            Long pid = null;
            Long sid = null;
            Long otherUid = chatMessageDslRepository.findAnother(room.getRoomId(), uid);
            String otherNickName = null;
//            User publisher = room.getPublisher();
//            User subscriber = room.getSubscriber();
//            if (publisher !=null)
//                pid = publisher.getUid();
//            if (subscriber !=null)
//                sid = subscriber.getUid();
//            Long searchResult =0L;
//            if (otherUid ==pid) {
//                searchResult=chatMessageDslRepository.search(target,room.getRoomId(),null,sid);
//            }else if(otherUid==sid) {
//                searchResult=chatMessageDslRepository.search(target, room.getRoomId(), pid, null);
//            }else{
//                searchResult=chatMessageDslRepository.search(target, room.getRoomId(), null, null);
//            }
//            if (searchResult==0L)
//                continue;
            RoomListResponseDTO roomList = new RoomListResponseDTO();

            User otherUser = null;
            if (otherUid != null) {
                otherUser = userRepository.findById(otherUid).orElseThrow(() -> new CrewException(ErrorCode.UID_NOT_EXIST));
            }

            if (otherUid == null) {
                Other another = new Other(null, null, null);
                roomList.setOther(another);
            } else {
                otherNickName = otherUser.getNickname();
                Other another = new Other(otherUid, otherUser.getNickname(), otherUser.getProfileImage());
                roomList.setOther(another);
            }


            roomList.setRoomId(room.getRoomId());
            if (room.getPublisher() == null) {
                roomList.setCaptain(false);
            }
            if (room.getPublisher() != null && room.getPublisher().getUid() == uid)
                roomList.setCaptain(true);
            else
                roomList.setCaptain(false);


            Board board = room.getBoard();
            Category category = board.getCategory();

            roomList.setBoardSeq(board.getId());
            roomList.setBoardTitle(board.getTitle());
            roomList.setCategoryId(category.getId());
            roomList.setCategoryName(category.getCategoryName());

            int left = chatMessageDslRepository.viewLeft(room.getRoomId(), otherUid);
            roomList.setUnReadCnt(Long.valueOf(left));
            ChatMessageRecentMessageDTO recentDTO = chatMessageDslRepository.lastMessage(room.getRoomId());
            if (recentDTO == null) {
                roomList.setRecentMessageTime(room.getCreatedDate());
                roomList.setRecentMessageContent(null);
            } else {
                roomList.setRecentMessageTime(recentDTO.getTime());
                roomList.setRecentMessageContent(recentDTO.getContent());
            }
            if (otherNickName != null && otherNickName.contains(target) == true) {
                System.out.println(otherNickName);
                log.info("닉네임에 속함");
                input = true;
            }
            if (board.getTitle().contains(target) == true || category.getCategoryName().contains(target) == true) {
                System.out.println(board.getTitle() + category.getCategoryName());
                log.info("카테고리 or 보드 타이틀에 속함");

                input = true;
            }
            if (room.getSubscriberIn()==0 || room.getPublisherIn()==0){
                roomList.setDelete(true);
            }else{
                roomList.setDelete(false);
            }
            System.out.println(otherNickName + board.getTitle() + category.getCategoryName() + input);
            if (input == true)
                result.add(roomList);
        }
        result.sort(Comparator.comparing(RoomListResponseDTO::getRecentMessageTime).reversed());
        return result;
    }


    public ChatRoom isValidRoom(UUID roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(() -> new CrewException(ErrorCode.ACCESS_DENIED));
        return chatRoom;
    }

    public void findByRoomIdAndSubscriberOrPublisher(UUID roomId, User user) {

        Optional<ChatRoom> leftUserInRoom = chatRoomRepository.findLeftUserInRoom(roomId,user);
        if (leftUserInRoom.isPresent()){
            throw new CrewException(ErrorCode.CHAT_USER_ALREADY_DELETE_ROOM);
        }
        Optional<ChatRoom> userInRoom = chatRoomRepository.findUserInRoom(roomId,user);

        if (userInRoom.isEmpty())
//        if (room1.isEmpty() && room2.isEmpty())
            throw new CrewException(ErrorCode.CHAT_NOT_ALLOWED_USER);
    }
    public void checkMessageSend(UUID roomId, User user) {

        Optional<ChatRoom> bothUserInRoom = chatRoomRepository.findBothUserInRoom(roomId);
        if(bothUserInRoom.isPresent()){
            throw new CrewException(ErrorCode.CHAT_NOT_OTHER_USER);
        }

        Optional<ChatRoom> userInRoom = chatRoomRepository.findUserInRoom(roomId,user);

        if (userInRoom.isEmpty())
//        if (room1.isEmpty() && room2.isEmpty())
            throw new CrewException(ErrorCode.CHAT_NOT_ALLOWED_USER);
    }

    @Transactional
    public ChatRoom createChatRoom(User me, Long board_seq, Long otherUid) {
        if (me.getUid() == otherUid) {
            throw new CrewException(ErrorCode.CHAT_NOT_SUPPORTED_SAME_USER);
        }

        Board board = boardRepository.findById(board_seq).orElseThrow(() -> new CrewException(ErrorCode.NOT_EXIST_BOARD_IN_ID));
        User other = userRepository.findById(otherUid).orElseThrow(()-> new CrewException(ErrorCode.CHAT_NOT_OTHER_USER));

        User pubs = board.getUser();
        Optional<ChatRoom> already = chatRoomRepository.findBySubscriberAndPublisherAndBoard(me, pubs, board);
        if (already.isPresent()) {
            ChatRoom chatRoom = already.get();
            return chatRoom;
        }
        if (board.getUser().getUid() != otherUid && board.getUser().getUid()!= me.getUid()){
            throw new CrewException(ErrorCode.CHAT_BOARD_NOT_ALLOWED);
        }

        if (board.getUser().getUid() == me.getUid()) {
            ChatRoom chatRoom = ChatRoom.builder().publisher(me).subscriber(other).board(board).publisherIn(1).subscriberIn(1).build();
            chatRoomRepository.save(chatRoom);
            return chatRoom;
        }
            ChatRoom chatRoom = ChatRoom.builder().publisher(other).subscriber(me).board(board).publisherIn(1).subscriberIn(1).build();
            chatRoomRepository.save(chatRoom);
            return chatRoom;

    }

    public void readMessage(UUID roomId, User user) {
        ChatRoom room = isValidRoom(roomId);
        chatMessageRepository.updateReadCnt(room,user);
    }


    @Transactional
    public void deleteRoom(List<UUID> rooms, User user) {
        for (UUID roomId : rooms) {
            int cnt = 0;
            ChatRoom chatRoom = isValidRoom(roomId);
            User publisher = chatRoom.getPublisher();
            User subscriber = chatRoom.getSubscriber();
            Long pid = null;
            Long sid = null;
            if (publisher != null) {
                pid = publisher.getUid();
            }
            if (chatRoom.getPublisherIn() == 0) {
                cnt += 1;
            }
            if (subscriber != null) {
                sid = subscriber.getUid();
            }
            if (chatRoom.getSubscriberIn() == 0) {
                cnt += 1;
            }
            if (pid == user.getUid() && chatRoom.getPublisherIn()==1) {
                chatMessageDslRepository.exitChatRoomPublisher(roomId, user.getUid());
                cnt += 1;
            }
            if (sid == user.getUid()  && chatRoom.getSubscriberIn()==1) {
                chatMessageDslRepository.exitChatRoomSubscriber(roomId, user.getUid());
                cnt += 1;
            }
            if (cnt == 2) {
                chatMessageDslRepository.deleteChatMessage(roomId);
                chatMessageDslRepository.deleteChatRoom(roomId);
            }


            System.out.println(roomId);
        }

    }
}

