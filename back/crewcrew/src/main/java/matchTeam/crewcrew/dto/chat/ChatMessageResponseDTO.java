package matchTeam.crewcrew.dto.chat;

import lombok.*;
import matchTeam.crewcrew.entity.chat.ChatMessage;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageResponseDTO {
    private Long messageId;
    private UUID roomId;
    private UserProfileDTO publisher;
    private UserProfileDTO subscriber;
    private String content;
    private LocalDateTime date;
    private int readCnt;


    @Builder
    public ChatMessageResponseDTO(ChatMessage message) {
        this.messageId = message.getMessageId();
        this.roomId = message.getChatRoom().getRoomId();
        this.publisher = null;
        this.subscriber = null;
        this.content = message.getContent();
        this.date = message.getCreatedDate();
        this.readCnt = message.getReadCnt();
    }
}
