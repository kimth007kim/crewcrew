package matchTeam.crewcrew.controller.api.v1.chat;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.chat.*;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.service.chat.ChatMessageService;
import matchTeam.crewcrew.service.chat.ChatRoomService;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;


@Api(tags = "10. talk (채팅)")
@RequiredArgsConstructor
@RequestMapping("/talk")
@RestController
@Slf4j
public class ChatRestController {
    private final ChatRoomService chatRoomService;
    private final UserService userService;
    private final ChatMessageService chatMessageService;

    @ApiOperation(value = "채팅방 1개의 정보를 확인합니다")
    @GetMapping("/room/{roomId}/detail")
    public ResponseEntity<Object> roomInfo(@PathVariable UUID roomId, @RequestHeader("X-AUTH-TOKEN") String token) {
        User user = userService.tokenChecker(token);

        RoomInfoResponseDTO result = chatRoomService.roomInfo(roomId,user);
        return ResponseHandler.generateResponse("해당 채팅방 정보 조회 성공", HttpStatus.OK, result);
    }

    // publisher 가 존재하지않음
    // subscriber 방장이 존재하지않음
    //board 가 존재하지않음
    @ApiOperation(value = "채팅방을 생성합니다.")
    @PostMapping("/room")
    public ResponseEntity<Object> createRoom(@RequestBody ChatRoomCreateDTO chatRoomCreateDTO, @RequestHeader("X-AUTH-TOKEN") String token) {
        User me = userService.tokenChecker(token);
        Long board_seq = chatRoomCreateDTO.getBoard_seq();
        ChatRoom room = chatRoomService.createChatRoom(me, board_seq, chatRoomCreateDTO.getOtherUid());
        return ResponseHandler.generateResponse("채팅방 생성 성공", HttpStatus.OK, room.getRoomId());
    }

    @ApiOperation(value = "X-AUTH-TOKEN으로 특정 멤버가 속한 모든 채팅방 조회")
    @GetMapping("/user")
    public ResponseEntity<Object> memberId( @RequestHeader("X-AUTH-TOKEN") String token) {
        User user = userService.tokenChecker(token);
        log.info("--------------------------uid"+user.getUid());
        List<RoomListResponseDTO> messages = chatRoomService.roomList(user.getUid());
        return ResponseHandler.generateResponse("member가 속한 방 리스트 조회 완료", HttpStatus.OK, messages);
    }

    @ApiOperation(value = "채팅방 검색기능 입력받은 문자열이 카테고리,상대닉네임,게시판이름이 포함된것 만 리턴")
    @GetMapping("/user/{target}")
    public ResponseEntity<Object> search( @RequestHeader("X-AUTH-TOKEN") String token,@PathVariable String target) {
        User user = userService.tokenChecker(token);
        List<RoomListResponseDTO> messages = chatRoomService.searchRoom(user.getUid(),target);
        return ResponseHandler.generateResponse("member가 속한 방 리스트 조회 완료", HttpStatus.OK, messages);
    }



    @ApiOperation(value = "roomId 로 채팅 목록을 확인합니다.")
    @GetMapping("/room/{roomId}")
    public ResponseEntity<Object> allMessageList(@PathVariable UUID roomId, @RequestHeader("X-AUTH-TOKEN") String token) {
        User user = userService.tokenChecker(token);
        List<ChatMessageResponseDTO> messages = chatRoomService.messageByRoomId(roomId);
        return ResponseHandler.generateResponse("특정룸의 룸Id로 모든 메세지 조회 성공", HttpStatus.OK, messages);
    }

    @ApiOperation(value = "페이징 처리한 룸아이디로 보는 메시지")
    @GetMapping("/room/{roomId}/{page}")
    public ResponseEntity<Object> pagenation(@PathVariable("roomId") UUID roomId, @PathVariable("page") int page, @RequestHeader("X-AUTH-TOKEN") String token) {
        User user = userService.tokenChecker(token);
        List<ChatMessageResponseDTO> result = chatRoomService.messageByRoomId(roomId, page, 10);
        return ResponseHandler.generateResponse("(페이지네이션) 특정룸의 룸Id로 모든 메세지 조회 성공", HttpStatus.OK, result);
    }

    @ApiOperation(value = "읽음 처리 하는 메서드")
    @PatchMapping("/room/{roomId}")
    public ResponseEntity<Object> readMessage(@PathVariable("roomId") UUID roomId, @RequestHeader("X-AUTH-TOKEN") String token) {
        User user = userService.tokenChecker(token);

        chatRoomService.readMessage(roomId, user);
//        chatRoomService.readMessage(roomId, user.getUid());
        return ResponseHandler.generateResponse("해당 방의 읽음처리 성공", HttpStatus.OK, null);
    }
    @ApiOperation(value = "삭제")
    @DeleteMapping("/room")
    public ResponseEntity<Object> deleteRoom(@RequestBody DeleteChatRoomDTO deleteChatRoomDTO,@RequestHeader("X-AUTH-TOKEN") String token) {
        User user = userService.tokenChecker(token);
        chatRoomService.deleteRoom(deleteChatRoomDTO.getRooms(),user);
        return ResponseHandler.generateResponse("해당 방의 읽음처리 성공", HttpStatus.OK, deleteChatRoomDTO);
    }


}
