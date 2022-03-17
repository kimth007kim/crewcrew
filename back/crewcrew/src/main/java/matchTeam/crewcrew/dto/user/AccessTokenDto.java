package matchTeam.crewcrew.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccessTokenDto {
    @ApiModelProperty(example = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9VU0VSIiwiUk9MRV9VU0VSIl0sImlhdCI6MTY0NzUwNjA3NywiZXhwIjoxNjQ3NzY1Mjc3fQ.wrtSwM7RbKJwsVKds8bRU_v8svrcX73JdPHKRz38_Z8")
    String accessToken;

}
