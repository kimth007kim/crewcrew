package matchTeam.crewcrew.controller.api.v1.chat;


import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.service.chat.ChatRoomService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }

//    // 모든 채팅방 목록 반환
//    @GetMapping("/rooms")
//    @ResponseBody
//    public List<ChatRoom> room() {
//        return chatRoomService.findAllRoom();
//    }

    //  채팅방 생성
//    @PostMapping("/room")
//    @ResponseBody
//    public ChatRoom createRoom(@RequestParam String name) {
//        return chatRoomService.createChatRoom(name);
//    }

    //채팅방 입장화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable UUID roomId){
        model.addAttribute("roomId",roomId);
        return "/chat/roomdetail";
    }

//    //특정 채팅방 조회
//    @GetMapping("/room/{roomId}")
//    @ResponseBody
//    public ChatRoom roomInfo(@PathVariable UUID roomId){
//        return chatRoomService.findRoomById(roomId);
//    }
}
