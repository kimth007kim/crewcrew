package matchTeam.crewcrew.dto.social;

import lombok.Getter;

@Getter
public class RetNaverOAuth {
    private String token_type;
    private String access_token;
    private Integer expires_in;
    private String refresh_token;
}
