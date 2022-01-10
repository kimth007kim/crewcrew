package matchTeam.crewcrew.oauth.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SnsType {
    NAVER("OAUTH_NAVER", "네이버 인증"),
    KAKAO("OAUTH_KAKAO", "카카오 인증"),
    EMAIL("OAUTH_EMAIL", "이메일 인증");

    private final String key;
    private final String title;
}
