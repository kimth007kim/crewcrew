package matchTeam.crewcrew.dto.user;

import lombok.*;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLoginRequestDto {
    private String email;
    private String password;
    private boolean maintain;

//    public User toUser(PasswordEncoder passwordEncoder) {
//        return User.builder()
//                .email(email)
//                .password(passwordEncoder.encode(password))
//                .build();
//    }
}