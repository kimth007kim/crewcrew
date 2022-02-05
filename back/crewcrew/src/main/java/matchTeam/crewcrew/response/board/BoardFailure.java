package matchTeam.crewcrew.response.board;

import lombok.*;

@AllArgsConstructor
@Getter
public class BoardFailure implements BoardResult{
    private String msg;

}
