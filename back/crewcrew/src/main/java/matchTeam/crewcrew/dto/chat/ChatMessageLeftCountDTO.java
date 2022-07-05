package matchTeam.crewcrew.dto.chat;

import lombok.Getter;
import matchTeam.crewcrew.entity.chat.ChatMessage;

@Getter
public class ChatMessageLeftCountDTO {
    private Long messageId;

    public ChatMessageLeftCountDTO(ChatMessage chatMessage) {
        this.messageId = chatMessage.getMessageId();
    }
}
