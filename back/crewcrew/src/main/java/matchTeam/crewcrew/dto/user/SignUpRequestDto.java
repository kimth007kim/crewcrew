package matchTeam.crewcrew.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequestDto {
    private String email;
    private String password;
    private String name;
    private String nickName;
    private MultipartFile file;
    private List<Long> categoryId;



    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickName)
//                .profileImage(image)
                .provider("local")
                .name(name)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }
}
