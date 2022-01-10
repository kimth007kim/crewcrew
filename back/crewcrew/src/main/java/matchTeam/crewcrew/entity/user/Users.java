package matchTeam.crewcrew.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import matchTeam.crewcrew.oauth.entity.BaseTimeEntity;
import matchTeam.crewcrew.oauth.entity.ProviderType;
import matchTeam.crewcrew.oauth.entity.RoleType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "USERS")
public class Users extends BaseTimeEntity {

    @Id @JsonIgnore
    @Column(name = "user_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq; // JPA 에서는 long이 bigint로 매칭된다. https://zetawiki.com/wiki/JPA_DB%EC%9E%90%EB%A3%8C%ED%98%95_%EB%A7%A4%ED%95%91

    @Column(nullable = false, name = "user_id", unique = true)
    @NotNull
    private String userId;

    @Column(nullable = false, name = "username")
    @NotNull
    private String username;

    @JsonIgnore
    @Column
    @NotNull
    private String password;

    @Column(nullable = false, unique = true)
    @NotNull
    private String email;

    @Column(name = "profile_image")
    @NotNull
    private byte[] profileImage;

    @Column
    private String introduce;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider_type")
    @NotNull
    private ProviderType providerType;

    @Column(name = "role_type", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleType roleType;

    @Builder
    public Users(@NotNull String userId, @NotNull String username, @NotNull String password, @NotNull String email, @NotNull byte[] profileImage, String introduce, @NotNull ProviderType providerType, @NotNull RoleType roleType) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.profileImage = profileImage;
        this.introduce = introduce;
        this.providerType = providerType;
        this.roleType = roleType;
    }
}
