package matchTeam.crewcrew.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
public class ChatMessageResponseDTO {
    private Long messageId;
    private UUID roomId;
    private UserProfileDTO publisher;
    private UserProfileDTO subscriber;
    private String content;
    private LocalDateTime date;
    private int readCnt;
//    private Su
}
