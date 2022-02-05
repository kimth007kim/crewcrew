package matchTeam.crewcrew.dto.social;

import lombok.Getter;
import lombok.ToString;

import java.util.Properties;

@Getter
public class KakaoProfile {
    private Long id;
    private Properties properties;
    private KakaoAcount kakao_account;

    @Getter
    @ToString
    public static class KakaoAcount {
        private String email;
    }

    @Getter
    @ToString
    public static class Properties{
        private String nickname;
    }
}
