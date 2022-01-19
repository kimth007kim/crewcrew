package matchTeam.crewcrew.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JoinSuccess {
    private Long id;
    private String email;
    private String nickName;
    private String name;
}
