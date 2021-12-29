package matchTeam.crewcrew.domain;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private long Id;
    private String email;
    private String password;
    private MultipartFile imgFile;

}
