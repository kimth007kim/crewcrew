package matchTeam.crewcrew.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomResponseDTO {
    private UUID roomId;
    private Long pub;
    private Long sub;
    private LocalDateTime date;
//    private Su
}
