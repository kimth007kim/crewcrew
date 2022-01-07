package matchTeam.crewcrew.dto;

import lombok.Data;
import lombok.Getter;
import matchTeam.crewcrew.entity.User;

@Data
@Getter
public class UserDTO {
    private Long uid;
    private String email;
    private String password;
    private byte[] profileimage;
    private String introduce;
    private String nickname;

    public UserDTO(User user) {
        this.uid= user.getUid();
        this.email= user.getEmail();
        this.password=user.getPassword();
        this.profileimage=user.getProfileimage();
        this.introduce= user.getIntroduce();
        this.nickname= user.getIntroduce();
    }
}
