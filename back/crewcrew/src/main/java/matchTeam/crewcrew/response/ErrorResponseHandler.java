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
@AllArgsConstructor
public class ErrorResponseHandler {
    private String message;
    private boolean error;
    private int status;
    public static class CustomFieldError {
        private String field;
        private String value;
        private String reason;

        private CustomFieldError(FieldError fieldError) {
            this.field = fieldError.getField();
            this.value = fieldError.getRejectedValue().toString();
            this.reason = fieldError.getDefaultMessage();
        }

        public String getField() {
            return field;
        }

        public String getValue() {
            return value;
        }

        public String getReason() {
            return reason;
        }
    }
    private void setErrorCode(ErrorCode errorCode) {
//        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
        this.status = errorCode.getStatus();
        this.error = errorCode.getError();
    }
    private ErrorResponseHandler(ErrorCode errorCode, List<FieldError> errors) {
        setErrorCode(errorCode);
    }
    private ErrorResponseHandler(ErrorCode errorCode, String exceptionMessage) {
        setErrorCode(errorCode);
    }

    public static ErrorResponseHandler of(ErrorCode errorCode) {
        return new ErrorResponseHandler(errorCode, Collections.emptyList());
    }
    public static ErrorResponseHandler of(){
        return new ErrorResponseHandler(ErrorCode.EXCEPTION,Collections.emptyList());
    }
    public String getMessage() {
        return message;
    }
    public boolean getError() {
        return error;
    }
}


