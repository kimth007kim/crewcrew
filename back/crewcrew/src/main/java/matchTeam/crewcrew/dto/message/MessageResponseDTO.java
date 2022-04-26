package matchTeam.crewcrew.dto.message;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.message.Message;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class MessageResponseDTO {
    @ApiModelProperty(value = "쪽지의 id", notes = "해당 쪽지의 id", example = "1")
    private Long messageID;

    @ApiModelProperty(value = "보내는 유저의 닉네임", notes = "쪽지를 보내는 유저의 닉네임")
    private String sendNick;

    @ApiModelProperty(value = "받는 유저의 닉네임", notes = "쪽지를 받는 유저의 닉네임")
    private String recvNick;

    @ApiModelProperty(value = "채팅방의 id", notes = "해당 채팅방(쪽지방)의 id", example = "1")
    private Long roomID;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "쪽지를 보낸 시간", notes = "년원일 시간 분 초", example = "2022-02-16 09:30:00")
    private LocalDateTime sendTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "쪽지를 읽은 시간", notes = "년원일 시간 분 초", example = "2022-02-16 09:30:00")
    private LocalDateTime readTime;

    @ApiModelProperty(value = "쪽지 본문 내용", notes = "쪽지 본문 내용", example = "test content")
    private String messageContent;

    @ApiModelProperty(value = "쪽지 읽음 여부", notes = "읽었으면 True, 안 읽었으면 False로 표현", example = "1")
    private Boolean readChk;

    @QueryProjection
    @Builder
    public MessageResponseDTO(Message res) {
        this.messageID = res.getMessageID();
        this.sendNick = res.getSendUser().getNickname();
        this.recvNick = res.getRecvUser().getNickname();
        this.roomID = res.getRoomID();
        this.sendTime = res.getSendTime();
        this.readTime = res.getReadTime();
        this.messageContent = res.getMessageContent();
        this.readChk = res.getReadChk();
    }

    public static MessageResponseDTO toDTO(Message message){
        return MessageResponseDTO.builder()
                .res(message).build();
    }
}
