package matchTeam.crewcrew.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Other {
    private Long uid;
    private String nickName;
    private String profileImage;

    public Other(Long uid, String nickName, String profileImage) {
        this.uid = uid;
        this.nickName = nickName;
        this.profileImage = profileImage;
    }
}