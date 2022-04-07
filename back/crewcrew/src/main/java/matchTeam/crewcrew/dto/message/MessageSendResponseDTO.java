package matchTeam.crewcrew.dto.message;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.message.Message;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class MessageSendResponseDTO {

    @ApiModelProperty(value = "쪽지 id", notes = "전송에 성공한 쪽지의 id", required = true, example = "my message")
    private Long messageID;

    @ApiModelProperty(value = "쪽지방(채팅방)의 id", notes = "전송에 성공한 쪽지방(채팅방)의 id", required = true, example = "my message")
    private Long roomID;

    @ApiModelProperty(value = "보내는 유저의 uid", notes = "전송에 성공한 쪽지를 보내는 유저의 uid", required = true, example = "1")
    private Long sendUserUID;

    @ApiModelProperty(value = "받는 유저의 uid", notes = "전송에 성공한 쪽지를 받는 유저의 uid", required = true, example = "2")
    private Long recvUserUID;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty(value = "전송 시각", notes = "년원일 시간 분까지")
    private LocalDateTime sendTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty(value = "읽은 시각", notes = "년원일 시간 분까지")
    private LocalDateTime readTime;

    @ApiModelProperty(value = "쪽지 내용", notes = "전송에 성공한 쪽지 내용", required = true, example = "my message")
    private String messageContent;

    @ApiModelProperty(value = "확인 여부", notes = "쪽지 내용 확인 여부", required = true, example = "false")
    private Boolean readChk;

    @Builder
    public MessageSendResponseDTO(Message res){
        this.messageID = res.getMessageID();
        this.sendUserUID = res.getSendUser().getUid();
        this.recvUserUID = res.getRecvUser().getUid();
        this.roomID = res.getRoomID();
        this.sendTime = res.getSendTime();
        this.readTime = res.getReadTime();
        this.messageContent = res.getMessageContent();
        this.readChk = res.getReadChk();
    }
}
