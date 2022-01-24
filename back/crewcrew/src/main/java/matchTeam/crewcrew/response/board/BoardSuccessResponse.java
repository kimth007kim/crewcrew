package matchTeam.crewcrew.response.board;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nimbusds.oauth2.sdk.SuccessResponse;
import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BoardSuccessResponse<T> {
    private String message;
    private int statusCode;
    private T data;

    public static <T> BoardSuccessResponse success(T data){
        BoardSuccessResponse responseUtil = BoardSuccessResponse.builder()
                .statusCode(200)
                .message("success")
                .data(data)
                .build();

        return responseUtil;
    }
}
