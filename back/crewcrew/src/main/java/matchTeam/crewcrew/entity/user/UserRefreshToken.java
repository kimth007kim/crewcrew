package matchTeam.crewcrew.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "USER_REFRESH_TOKEN")
public class UserRefreshToken {

    @JsonIgnore
    @Id
    @Column(name = "refresh_token_seq")
    private Long refreshTokenSeq;

    @Column(name = "user_id", unique = true)
    @NotNull
    private String userId;

    @Column(name = "refresh_token")
    @NotNull
    private String refreshToken;

    @Builder
    public UserRefreshToken(@NotNull String userId, @NotNull String refreshToken) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
