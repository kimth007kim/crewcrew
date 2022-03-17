package matchTeam.crewcrew.dto.user;

import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(example = "abc@naver.com")
    private String email;
    @ApiModelProperty(example = "abcd12345678")
    private String password;
    @ApiModelProperty(example = "김경동")
    private String name;
    @ApiModelProperty(example = "momo")
    private String nickName;
    @ApiModelProperty(example = "profileImage.jpg")
    private MultipartFile file;
    @ApiModelProperty(example = "[3,4,5]")
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
