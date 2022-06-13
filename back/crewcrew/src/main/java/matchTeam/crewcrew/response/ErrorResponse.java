package matchTeam.crewcrew.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@Builder
public class ErrorResponse {
    private final String message;
    private final boolean error;
    private final int status;



    public static ErrorResponseHandler of(ErrorCode errorCode) {
        return ErrorResponseHandler.builder()
                .message(errorCode.getMessage())
                .status(errorCode.getStatus())
                .error(true)
                .build();
    }
}


