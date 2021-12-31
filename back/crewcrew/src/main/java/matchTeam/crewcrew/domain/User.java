package matchTeam.crewcrew.domain;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private long Id;
    private String email;
    private String password;
    private byte[] files;
    private String introduce;
    private String nickname;

}
