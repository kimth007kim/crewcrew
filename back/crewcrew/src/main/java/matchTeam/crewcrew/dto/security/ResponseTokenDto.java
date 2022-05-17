package matchTeam.crewcrew.dto.security;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTokenDto {
    private String grantType;
    @ApiModelProperty(example = " eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc2MDYxMDd9.H1L_kYlvQWMFOqVKjD4vjQaxW_dAwEDzRikf1u72ico")
    private String accessToken;
    @ApiModelProperty(example = " eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc2MDYxMDd9.H1L_kYlvQWMFOqVKjD4vjQaxW_dAwEDzRikf1u72ico")
    private String refreshToken;
    private Long accessTokenExpireDate;
    private Long refreshTokenExpireDate;

}
