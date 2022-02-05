package matchTeam.crewcrew.response.board;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BoardSuccess<T> implements BoardResult {
    private T data;
}
