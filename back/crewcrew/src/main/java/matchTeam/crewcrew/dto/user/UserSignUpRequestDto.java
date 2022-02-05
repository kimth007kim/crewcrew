package matchTeam.crewcrew.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

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
//
//    public User toEntity(PasswordEncoder passwordEncoder) {
//        return User.builder()
//                .email(email)
//                .password(passwordEncoder.encode(password))
//                .nickname(nickName)
//                .provider("local")
//                .name(name)
//                .roles(Collections.singletonList("ROLE_USER"))
//                .build();
//    }


    public User toEntity() {
        return User.builder()
                .email(email)
                .nickname(nickName)
                .name(name)
                .provider(provider)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }
}