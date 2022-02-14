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
    AUTHENTICATION_ENTRY(9999, "ILLEGAL ACCESS", "권한이 부족한 토큰의 접근입니다."),
    ACCESS_DENIED(-100,"PERMISSION_DENIED","접근 권한이 없습니다."),
    // Exception
    EXCEPTION(500, "EXCEPTION", "아직 지정되지않은 예외가 발생했습니다."),

    //1000~1099 이메일 회원가입에 대한 예외

    EMAIL_NOT_VALID(1001,"EMAIL_INVALID","이메일 형식이 유효하지않습니다."),
    USER_ALREADY_EXIST(1002,"USER ALREADY EXIST","이미 존재하는 유저입니다."),
    EMAIL_CODE_NOT_MATCH(1003,"EMAIL_0000","발급된 인증 코드가 이메일과 다릅니다."),

    EMAIL_CODE_NOT_VERIFIED(1004,"EMAIL_002","이메일 인증이 되지않은 이메일 주소입니다."),
    SIGN_UP_EMAIL_ALREADY_EXIST_FAILED(1005,"EMAIL_001","현재 입력한 이메일을 가진 유저가 이미 존재합니다. "),

    //1100~1199 이메일 로그인 대한 예외

    LOGIN_FAILED_BY_EMAIL(1101,"EMAIL NOT EXIST","존재하지 않는 이메일 입니다."),
    LOGIN_FAILED_BY_PASSWORD(1102,"PASSWORD INCORRECT","비밀번호가 이메일과 일치하지않습니다."),

    // 1300~1399 카카오 로그인 회원가입에 대한 예외
    KAKAO_COMMUNICATION_FAILED(1300,"KAKAO_01","카카오와 http통신이 실패하였습니다."),

    KAKAKO_USER_ALREADY_EXIST(1301,"KAKAKO_USER ALREADY EXIST","이미 존재하는 카카오 유저입니다."),



    // 1400~1499 네이버 로그인 회원가입에 대한 예외
    NAVER_COMMUNICATION_FAILED(1400,"NAVER_01","네이버와 http통신이 실패하였습니다."),
    NAVER_USER_ALREADY_EXIST(1401,"NAVER_USER ALREADY EXIST","이미 존재하는 네이버 유저입니다."),




    // 1900~1999 토큰관련 예외

    INVALID_TOKEN(1900,"INVALID TOKEN","입력받은 엑세스토큰에 해당하는 유저가없습니다"),
    INVALID_REFRESH_TOKEN(1901,"INVALID REFRESH TOKEN","유효하지않은 리프레시 토큰입니다."),
    PK_USER_NOT_FOUND(1902, "USER NOT FOUND","토큰의 pk로 유저를 찾을수 없습니다."),
    REFRESH_TOKEN_NOT_EXIST_DB(1903, "REFRESH TOKEN NOT IN DB","DB에 해당 Refresh 토큰이 존재하지않습니다."),
    REFRESH_TOKEN_NOT_MATCH(1904, "REFRESH TOKEN NOT MATCHED","입력받은 Refresh토큰이 DB에 저장된 Refresh토큰과 다릅니다."),













    //게시판 관련 에러
    THE_NUMBER_OF_CREW_BY_ZERO(400, "THE_NUMBER_OF_CREW_SET_ZERO", "모집인원이나 총인원이 0이하입니다"),
    OVER_RECRUITED(400, "RECRUITED_OVER_TOTAL", "총인원이 모집인원보다 적습니다"),
    BOARD_NOT_FOUND(400, "INVALID_BOARD_ID", "해당 게시글이 존재하지 않습니다"),
    CATEGOTY_NOT_FOUND(501, "INVALID_CATEGORY_ID", "해당 카테고리가 존재하지 않습니다"),
    NOT_SELECT_DETAIL_CATEGORY(400, "INVALID_DETAIL_CATEGORY", "세부 카테고리를 지정하지 않았습니다"),
    EXPIRED_DATE_BEFORE_TODAY(400, "INVALID_EXPIRED_DATE", "만료 날짜가 오늘보다 이전입니다");



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
