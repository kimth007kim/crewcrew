package matchTeam.crewcrew.controller.api.v1.chat;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.chat.ChatMessageResponseDTO;
import matchTeam.crewcrew.dto.chat.ChatRoomCreateDTO;
import matchTeam.crewcrew.dto.chat.ChatRoomResponseDTO;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.test.Member;
import matchTeam.crewcrew.entity.user.test.MemberRepository;
import matchTeam.crewcrew.repository.chat.ChatMessageRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.service.chat.ChatMessageService;
import matchTeam.crewcrew.service.chat.ChatRoomService;
import matchTeam.crewcrew.response.ResponseHandler;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;



@Api(tags = "10. talk (채팅)")
@RequiredArgsConstructor
@RequestMapping("/talk")
@RestController
public class ChatRestController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final MemberRepository memberRepository;

    @ApiOperation(value = "멤버를 생성합니다.")
    @PostMapping("/member")
    public ResponseEntity<Object> createMember(){
        Member member = new Member();
        memberRepository.save(member);
        StringBuilder sb = new StringBuilder();
        sb.append(member.getId());
        sb.append("번 멤버 생성 성공");
        return ResponseHandler.generateResponse(sb.toString(), HttpStatus.OK, null);
    }

    @ApiOperation(value = "모든 멤버를 확인합니다.")
    @GetMapping("/members")
    public ResponseEntity<Object> members(){
        Member member = new Member();
        List<Member> members =memberRepository.findAll();
        return ResponseHandler.generateResponse("모든 멤버 조회 완료", HttpStatus.OK, members);
    }


    @ApiOperation(value = "멤버를 삭제합니다.")
    @DeleteMapping("/members/{uid}")
    public ResponseEntity<Object> deleteMember(@PathVariable Long uid){
        Member member= memberRepository.findById(uid).orElseThrow(()-> new CrewException(ErrorCode.UID_NOT_EXIST));

        memberRepository.delete(member);
        return ResponseHandler.generateResponse(uid+"번 멤버 삭제완료", HttpStatus.OK, null);
    }

    @ApiOperation(value = "모든 채팅방을 확인합니다.")
    @GetMapping("/rooms/every")
    public ResponseEntity<Object> err(Long uid){
        List<ChatRoom> rooms = chatRoomService.listRoom(uid);
        return ResponseHandler.generateResponse("모든 채팅방 조회 성공", HttpStatus.OK, rooms);
    }

    @ApiOperation(value = "모든 채팅방을 확인합니다.")
    @GetMapping("/rooms")
    public ResponseEntity<Object> rooms(){
        List<ChatRoomResponseDTO> rooms = chatRoomService.findAllRoom();
        return ResponseHandler.generateResponse("모든 채팅방 조회 성공", HttpStatus.OK, rooms);
    }
    // publisher 가 존재하지않음
    // subscriber 방장이 존재하지않음
    //board 가 존재하지않음
    @ApiOperation(value = "채팅방을 생성합니다.")
    @PostMapping("/room")
    public ResponseEntity<Object> createRoom(@RequestBody ChatRoomCreateDTO chatRoomCreateDTO){
            ChatRoom room =chatRoomService.createChatRoom(chatRoomCreateDTO);
        return ResponseHandler.generateResponse("채팅방 생성 성공", HttpStatus.OK, room.getRoomId());
    }
    @ApiOperation(value = "memberId로 특정 멤버가 속한 모든 채팅방 조회")
    @GetMapping("/user/{memberID}")
    public ResponseEntity<Object> memberId(@PathVariable Long memberID){
        List<ChatRoomResponseDTO> messages = chatRoomService.roomlist(memberID);
        return ResponseHandler.generateResponse("member가 속한 방 리스트 조회 완료", HttpStatus.OK, messages);
    }


    @ApiOperation(value = "roomId 로 채팅 목록을 확인합니다.")
    @GetMapping("/room/{roomId}")
    public ResponseEntity<Object> roomInfo(@PathVariable UUID roomId){
        List<ChatMessageResponseDTO> messages = chatRoomService.messageByRoomId(roomId);
        return ResponseHandler.generateResponse("특정룸의 룸Id로 모든 메세지 조회 성공", HttpStatus.OK, messages);
    }

    @ApiOperation(value = "페이징 처리한 룸아이디로 보는 메시지")
    @GetMapping("/room/{roomId}/{page}")
    public ResponseEntity<Object> pagenation(@PathVariable("roomId") UUID roomId,@PathVariable("page") int page){
        List<ChatMessageResponseDTO> result =  chatRoomService.messageByRoomId(roomId,page,10);
        return ResponseHandler.generateResponse("(페이지네이션) 특정룸의 룸Id로 모든 메세지 조회 성공", HttpStatus.OK, result);
    }




}
