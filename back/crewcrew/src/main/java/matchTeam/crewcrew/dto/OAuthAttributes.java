package matchTeam.crewcrew.dto;

import lombok.Builder;
import lombok.Getter;
import matchTeam.crewcrew.Entity.oauth.SnsType;
import matchTeam.crewcrew.Entity.oauth.Users;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes; // OAuth2 반환하는 유저 정보 Map
    private String nameAttributeKey;
    private String username;
    private String nickname;
    private String email;
    private byte[] profileImage;


    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey,
                           String username, String nickname, String email, byte[] profileImage) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.username = username;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        // 여기서 네이버와 카카오 등 구분 (ofNaver, ofKakao)

        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .username((String) attributes.get("username"))
                .email((String) attributes.get("email"))
                .profileImage((byte[]) attributes.get("profileImage"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public Users toEntity(){
        return Users.builder()
                .username(username)
                .email(email)
                .profileImage(profileImage)
                .build();
    }
}
