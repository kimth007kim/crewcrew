package matchTeam.crewcrew.dto.chat;


import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class DeleteChatRoomDTO {
    private List<UUID> rooms;
}
