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

    LOGIN_FAILED_BY_EMAIL(501,"EMAIL NOT EXIST","email not exist"),
    LOGIN_FAILED_BY_PASSWORD(502,"PASSWORD INCORRECT","password not correct with email"),
    ACCESS_DENIED(-100,"PERMISSION_DENIED","permission is not accessible to this resuource"),
    LOGIN_FAILED(600,"LOGIN_FAILED","invalid email or password"),
    // Exception
    EXCEPTION(500, "EXCEPTION", "exception"),


    //게시판 관련 에러
    THE_NUMBER_OF_CREW_BY_ZERO(400, "", "모집인원이나 총인원이 0이하입니다"),
    OVER_RECRUITED(400, "", "총인원이 모집인원보다 적습니다"),
    BOARD_NOT_FOUND(400, "", "해당 게시글이 존재하지 않습니다"),
    CATEGOTY_NOT_FOUND(501, "", "해당 카테고리가 존재하지 않습니다"),
    NOT_SELECT_DETAIL_CATEGORY(400, "", "세부 카테고리를 지정하지 않았습니다"),

    SIGN_UP_FAILED(1001,"EMAIL_001","email alreadyExist ");


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
