package matchTeam.crewcrew.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomCreateDTO {
    private Long board_id;
    private Long subscriber_id;
    private Long publisher_id;

}
