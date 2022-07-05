package matchTeam.crewcrew.dto.chat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class RoomInfoResponseDTO {
    private UUID roomId;

    private Long boardSeq;
    private boolean captain;
    private String boardTitle;
    private Other other;

    private Long categoryId;
    private String categoryName;


}
