package matchTeam.crewcrew.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import matchTeam.crewcrew.oauth.entity.BaseTimeEntity;
import matchTeam.crewcrew.oauth.entity.ProviderType;
import matchTeam.crewcrew.oauth.entity.RoleType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Arrays;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column(nullable = false, unique = true)
    @NotNull
    private String email;

    @Column
    private String introduce;


    @Column
    private String name;

    @Column
    @NotNull
    private String password;

    @Column(name = "profile_image")
    private byte[] profileImage;

    @Column
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider_type")
    private ProviderType providerType;

    @Column
    private String role;

    @Builder
    public User(Long uid, String email, String password, byte[] profileImage, String introduce, ProviderType providerType, String role) {
        this.uid= uid;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
        this.introduce = introduce;
        this.providerType = providerType;
        this.role=role;
    }

    @Override
    public String toString() {
        return "User{" +
                "uid=" + uid +
                ", email='" + email + '\'' +
                ", introduce='" + introduce + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", profileImage=" + Arrays.toString(profileImage) +
                ", nickname='" + nickname + '\'' +
                ", providerType=" + providerType +
                ", role=" + role +
                '}';
    }
}
