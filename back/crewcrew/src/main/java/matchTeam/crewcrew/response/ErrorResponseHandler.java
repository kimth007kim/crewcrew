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

//@Setter
//@Getter
//@Builder
//public class ErrorResponseHandler {
//    private final String message;
//    private final boolean error;
//    private final int status;
//
//
//
//    public static ErrorResponseHandler of(ErrorCode errorCode) {
//        return ErrorResponseHandler.builder()
//                .message(errorCode.getMessage())
//                .status(errorCode.getStatus())
//                .error(true)
//                .build();
//    }
//}


@Setter
@Getter
@Builder
@AllArgsConstructor
public class ErrorResponseHandler {
//        private String code;
    private String message;
    private boolean error;
    private int status;
    //    private List<CustomFieldError> errors;
//    private final String message;
//    private final boolean error;
//    private final int status;


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
//        this.error="True";
//        this.errors = errors.stream().map(CustomFieldError:: new).collect(Collectors.toList());
    }
    private ErrorResponseHandler(ErrorCode errorCode, String exceptionMessage) {
        setErrorCode(errorCode);
//        this.error="True";
//        this.errors = List.of(new CustomFieldError("", "", exceptionMessage));
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

    public int getStatus() {
        return status;
    }

    public boolean getError() {
        return error;
    }
//    public List<CustomFieldError> getErrors() {
//        return errors;
//    }
}


