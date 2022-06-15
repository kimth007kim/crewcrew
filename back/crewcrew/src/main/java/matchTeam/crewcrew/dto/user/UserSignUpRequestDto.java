package matchTeam.crewcrew.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserSignUpRequestDto {
    private String email;
    private String password;
    private String name;
    private String nickName;
    private String provider;
//    private List<Long> categoryId;
//
    public User toEntity(String prov) {
        return User.builder()
                .email(email)
                .nickname(nickName)
                .provider(prov)
                .name(name)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }

}