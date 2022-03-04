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
    // 1. 2000~2099 카테고리에 관련된 예외
    NOT_EXIST_CATEGORY(2001, "NOT EXIST CATEGORY", "존재하지 않는 카테고리 번호입니다."),
    ASK_NOT_DETAIL_CATEGORY(2002, "ASK NOT DETAIL CATEGORY", "부모 카테고리에 대해 조회했습니다."),

    // 2. 2100~2199 게시판 수정과 작성시 요청에 대한 유효성 관련 에러
    NO_TITLE(2101, "NO TITLE", "제목이 비어있습니다."),
    NO_CONTENT(2102,"NO CONTENT", "본문 내용이 비어있습니다."),
    NOT_VALID_APPROACH(2103,"NOT VALID APPROACH", "유효하지 않은 모임방식입니다."),
    NOT_SELECT_CATEGORY(2104, "NOT SELECT CATEGORY", "카테고리 값이 비어있습니다."),
    NOT_SELECT_CHILD_CATEGORY(2105,"NOT SELECT CHILD CATEGORY", "상세 카테고리를 고르지 않았습니다."),
    NOT_VALID_TOTAL_CREW(2106,"NOT VALID RECRUITED CREW", "모집인원이 0명이하입니다."),
    OVER_TOTAL_CREW(2107,"NOT VALID TOTAL CREW", "모집인원이 10명보다 큽니다."),
    OVER_RECRUITED_CREW(2108,"OVER RECRUITED CREW", "모집인원이 총인원보다 많습니다."),
    NOT_VALID_EXPIRED_DATE(2109," NOT VALID EXPIRED DATE", "만료날짜가 오늘날짜보다 이전이거나 오늘입니다."),
    NOT_MATCH_UID(2110, "NOT MATCH UID", "요청한 유저와 응답한 결과의 유저가 다릅니다."),
    NOT_VALID_UID(2111, "NOT VALID UID", "존재하지 않는 유저입니다."),
    NOT_MATCh_BOARD_ID(2112, "NOT BOARD ID", "요청한 게시판 번호와 응답한 결과의 게시판 번호가 다릅니다"),



    // 3. 2201~2299 게시판 삭제에 대한 예외
    NOT_EXIST_BOARD_IN_ID(2301, "NOT EXIST_BOARD IN ID", "존재하지 않는 게시글 번호입니다.");

    // 4. 2300~2399 게시판 조회에 대한 예외



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
