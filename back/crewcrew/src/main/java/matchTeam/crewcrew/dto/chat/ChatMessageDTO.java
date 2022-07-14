package matchTeam.crewcrew.dto.chat;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ChatMessageDTO {
    public enum MessageType{
        EXIT,TALK
    }

    private MessageType type;
    private UUID roomId;
    private Long uid;
    private String content;
}
