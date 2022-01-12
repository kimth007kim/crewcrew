package matchTeam.crewcrew.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import matchTeam.crewcrew.oauth.entity.BaseTimeEntity;
import matchTeam.crewcrew.oauth.entity.ProviderType;
import matchTeam.crewcrew.oauth.entity.RoleType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @JsonIgnore
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

    @Column(name = "role_type", length = 20)
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Builder
    public User(Long uid, String email, String password, byte[] profileImage, String introduce, ProviderType providerType, RoleType roleType) {
        this.uid= uid;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
        this.introduce = introduce;
        this.providerType = providerType;
        this.roleType = roleType;
    }


}
