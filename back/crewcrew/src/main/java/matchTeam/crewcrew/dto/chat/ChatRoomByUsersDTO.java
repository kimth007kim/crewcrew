package matchTeam.crewcrew.dto.chat;

import lombok.Getter;
import matchTeam.crewcrew.entity.chat.ChatRoom;

@Getter
public class ChatRoomByUsersDTO {
    private Long publisherId;
    private Long subscriberId;

    public ChatRoomByUsersDTO(ChatRoom room) {
        if (room.getPublisher() == null) {
            this.publisherId = null;
        } else {

            this.publisherId = room.getPublisher().getUid();
        }
        if (room.getSubscriber() == null) {
            this.subscriberId = null;
        } else {

            this.subscriberId = room.getSubscriber().getUid();
        }
    }
}
