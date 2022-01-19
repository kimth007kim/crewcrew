package matchTeam.crewcrew.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter
public class UserDTO {
    private Long uid;
    private String email;
    private String name;
    private String password;
    private byte[] profileimage;
    private String introduce;
    private String nickname;

}
