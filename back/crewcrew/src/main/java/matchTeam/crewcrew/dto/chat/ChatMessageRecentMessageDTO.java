package matchTeam.crewcrew.dto.chat;

import lombok.Getter;
import matchTeam.crewcrew.entity.chat.ChatMessage;

import java.time.LocalDateTime;

@Getter
public class ChatMessageRecentMessageDTO {
    private LocalDateTime time;
    private String content;

    public ChatMessageRecentMessageDTO(ChatMessage chatMessage) {
        this.time = chatMessage.getCreatedDate();
        this.content = chatMessage.getContent();
    }
}
