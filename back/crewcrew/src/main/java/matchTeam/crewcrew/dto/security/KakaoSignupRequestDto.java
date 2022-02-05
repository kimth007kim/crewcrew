package matchTeam.crewcrew.dto.security;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoSignupRequestDto {
    private String accessToken;
}
