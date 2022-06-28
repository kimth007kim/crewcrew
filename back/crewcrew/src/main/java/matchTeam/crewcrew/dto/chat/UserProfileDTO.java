package matchTeam.crewcrew.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    private Long uid;
    private String nickName;
    private String image;
}
