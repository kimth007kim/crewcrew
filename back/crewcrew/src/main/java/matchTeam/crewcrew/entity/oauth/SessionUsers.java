package matchTeam.crewcrew.Entity.oauth;

import lombok.Getter;

import java.io.Serializable;

/**
 * 직렬화 기능을 가진 User클래스
 */
@Getter
public class SessionUsers implements Serializable {
    private String username;
    private String email;
    private byte[] profileImage;

    public SessionUsers(Users user){
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.profileImage = user.getProfileImage();
    }
}