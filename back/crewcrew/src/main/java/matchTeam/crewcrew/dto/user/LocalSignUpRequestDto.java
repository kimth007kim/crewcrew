package matchTeam.crewcrew.dto.user;

import matchTeam.crewcrew.entity.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LocalSignUpRequestDto {
    private String email;
    private String password;
    private String name;
    private String nickName;



    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickName)
                .provider("local")
                .name(name)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }
}
