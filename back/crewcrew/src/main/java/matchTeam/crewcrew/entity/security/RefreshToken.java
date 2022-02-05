package matchTeam.crewcrew.entity.security;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.BaseTimeEntity;

import javax.persistence.*;

@Entity
@Table(name = "refresh_token")
@Getter
@NoArgsConstructor
public class RefreshToken extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long pkey;

    @Column(nullable = false)
    private String token;

    public RefreshToken updateToken(String token){
        this.token=token;
        return this;
    }

    @Builder
    public RefreshToken(Long pkey, String token) {
        this.pkey = pkey;
        this.token = token;
    }
}