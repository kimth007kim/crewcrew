package matchTeam.crewcrew.dto.social;

import lombok.Getter;
import lombok.ToString;

@Getter
public class NaverProfile {
    private String resultCode;
    private Response response;
//    private KakaoAccount kakao_account;

//    @Getter
//    @ToString
//    public static class KakaoAccount {
//        private String email;
//    }

    @Getter
    @ToString
    public static class Response{
        private String email;
        private String nickname;
        private String name;
        private String profile_image;
    }
}
