package matchTeam.crewcrew.response;

public enum ErrorCode {
    INVALID_INPUT_VALUE(400, "COMMON_001", " Invalid Input Value"),
    METHOD_NOT_ALLOWED(405, "COMMON_002", "Method not allowed"),
    HANDLE_ACCESS_DENIED(403, "COMMON_003", "Access is Denied"),
    INVALID_REQUEST_DATA(404,"INVALID_REQUEST","invalid Access"),
    TOKEN_NOT_FOUND(404,"TOKEN_NOT_FOUND","invalidToken"),

    // Standard
    ILLEGAL_STATE(400, "STANDARD_001", "illegal state"),
    ILLEGAL_ARGUMENT(400, "STANDARD_002", "illegal argument"),
    AUTHENTICATION_ENTRY(800, "ILLEGAL ACCESS", "Invalid token! Access denied"),

    USER_ALREADY_EXIST(500,"USER ALREADY EXIST","이미 존재하는 유저입니다."),
    LOGIN_FAILED_BY_EMAIL(501,"EMAIL NOT EXIST","존재하지 않는 이메일 입니다."),
    LOGIN_FAILED_BY_PASSWORD(502,"PASSWORD INCORRECT","비밀번호가 이메일과 일치하지않습니다."),
    ACCESS_DENIED(-100,"PERMISSION_DENIED","접근 권한이 없습니다."),
    LOGIN_FAILED(600,"LOGIN_FAILED","이메일이나 비밀번호가 잘못되었습니다."),
    USER_NOT_FOUND(500, "USER NOT FOUND","유저를 찾을수 없습니다."),

    // Exception
    EXCEPTION(500, "EXCEPTION", "exception"),

    EMAIL_CODE_NOT_MATCH(900,"EMAIL_0000","인증 코드가 다릅니다."),
    EMAIL_NOT_VALID(901,"EMAIL_INVALID","이메일 형식이 유효하지않습니다.."),


    INVALID_TOKEN(902,"INVALID TOKEN","유효하지 않는 토큰입니다."),

    SIGN_UP_FAILED(1001,"EMAIL_001","이메일이 이미 존재합니다. "),
    EMAIL_CODE_NOT_VERIFIED(1002,"EMAIL_002","이메일 인증이 되지않은 이메일 주소입니다."),
    KAKAO_COMMUNICATION_FAILED(1101,"KAKAO_01","카카오와 http통신이 실패하였습니다.");

    private int status;
    private final String code;
    private final String message;
    private final String error;


    ErrorCode( int status,String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.error = "True";

    }

    public String getError() {
        return error;
    }

    public int getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
