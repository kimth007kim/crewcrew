package matchTeam.crewcrew.dto.user.example;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OauthUrlResponseDto {
    @ApiModelProperty(example = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=99ba28ab4b31cad385145d741c0641fe&redirect_uri=http://localhost:8080/oauth/kakao/redirect")
    private String kakao;
    @ApiModelProperty(example = "https://nid.naver.com/oauth2.0/authorize?response_type=code&state=STATE_STRING&client_id=CTJFctZzRNLw8XkP1xik&redirect_uri=http://localhost:8080/oauth/naver/redirect")
    private String naver;
}
