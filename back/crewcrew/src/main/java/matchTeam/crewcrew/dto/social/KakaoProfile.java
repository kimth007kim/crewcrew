package matchTeam.crewcrew.dto.social;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import java.util.Properties;

@Getter
public class KakaoProfile {
    private Long id;
    private Properties properties;
    private KakaoAccount kakao_account;

    @Getter
    @ToString
    public static class KakaoAccount {
        private String email;
        private Profile profile;
    }

    @Getter
    @ToString
    public static class Properties{
        private String nickname;
    }

    @Getter
    @ToString
    public static class Profile{
        private String thumbnail_image_url;
        private String profile_image_url;

    }

}
