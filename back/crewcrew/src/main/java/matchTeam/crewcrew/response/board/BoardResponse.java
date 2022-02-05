package matchTeam.crewcrew.response.board;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class BoardResponse<T> {
    private boolean success;
    private int stausCode;
    private BoardResult result;

    public static BoardResponse success() {
        return new BoardResponse(true, 200, null);
    }

    public static <T> BoardResponse success(T data) {
        return new BoardResponse(true, 200, new BoardSuccess<>(data));
    }

    public static BoardResponse failure(int code, String msg) {
        return new BoardResponse(false, code, new BoardFailure(msg));
    }
}
