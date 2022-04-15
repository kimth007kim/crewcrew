package matchTeam.crewcrew.dto.user;

import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(value="이메일 주소", example = "abc@naver.com",dataType = "String")
    private String email;
    @ApiModelProperty(value="비밀번호", example = "abc1234",dataType = "String")
    private String password;
    @ApiModelProperty(value="로그인 유지 플래그", example = "true",dataType = "boolean")
    private boolean maintain;

//    public User toUser(PasswordEncoder passwordEncoder) {
//        return User.builder()
//                .email(email)
//                .password(passwordEncoder.encode(password))
//                .build();
//    }
}