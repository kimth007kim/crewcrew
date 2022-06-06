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
public class SignUpLocalRequestDto {
    @ApiModelProperty(value="이메일 주소", example = "abc@naver.com",dataType = "String")
    private String email;
    @ApiModelProperty(value="비밀번호",example = "abcd12345678",dataType = "String")
    private String password;
    @ApiModelProperty(value="이름",example = "김경동",dataType = "String")
    private String name;
    @ApiModelProperty(value="닉네임",example = "momo",dataType = "String")
    private String nickName;
    @ApiModelProperty(value="프로필 이미지",example = "profileImage.jpg")
    private String file;
//    private MultipartFile file;
    @ApiModelProperty(value="카테고리 아이디",example = "[3,4,5]",dataType = "Array[Long]")
    private List<Long> categoryId;
    @ApiModelProperty(value="한줄 메시지",example = "[3,4,5]",dataType = "Array[Long]")
    private String message;



    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickName)
                .profileImage(file)
                .message(message)
                .provider("local")
                .name(name)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }
}
