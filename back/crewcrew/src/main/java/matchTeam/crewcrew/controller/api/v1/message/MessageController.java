package matchTeam.crewcrew.controller.api.v1.message;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.message.MessageSendRequestDTO;
import matchTeam.crewcrew.dto.message.MessageSendResponseDTO;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.message.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Message Controller", tags = "7. Message")
@ApiOperation(value = "쪽지 조회, 수신 및 송신")
@RequiredArgsConstructor //생성자 주입
@RestController
public class MessageController {
    private final MessageService messageService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/message")
    public ResponseEntity<Object> send(@ApiParam(value = "쪽지 전송 요청 DTO", required = true)@RequestBody MessageSendRequestDTO req){
        //유효한 리퀘스트인지 확인
        messageService.checkValidSend(req);
        MessageSendResponseDTO sendMessage = messageService.send(req);
        return ResponseHandler.generateResponse("쪽지 전송 성공", HttpStatus.OK, sendMessage);
    }
}

// 쪽지 채팅방 리스트!
// 쪽지 송수신 !!
//
