package matchTeam.crewcrew.oauth.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Getter @NoArgsConstructor
public class Users extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger uid;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(name = "profile_image")
    private byte[] profileImage;

    @Column
    private String introduce;

    @Column(name = "sns_id")
    private String snsId;

    @Enumerated(EnumType.STRING)
    @Column(name = "sns_type")
    private SnsType snsType;

    @Builder
    public Users(BigInteger uid, String username, String email, String nickname, byte[] profileImage) {
        this.uid = uid;
        this.username = username;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public Users update(String nickname, byte[] profileImage){
        this.nickname = nickname;
        this.profileImage = profileImage;

        return this;
    }

    public String getSnsTypeKey(){
        return this.snsType.getKey();
    }
}
