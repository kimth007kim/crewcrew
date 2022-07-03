package matchTeam.crewcrew.response;

public enum ErrorCode {
    INVALID_INPUT_VALUE(400, "COMMON_001", " Invalid Input Value"),
    METHOD_NOT_ALLOWED(401, "COMMON_002", "Method not allowed"),
    HANDLE_ACCESS_DENIED(402, "COMMON_003", "Access is Denied"),
    INVALID_REQUEST_DATA(403,"INVALID_REQUEST","invalid Access"),
    TOKEN_NOT_FOUND(404,"TOKEN_NOT_FOUND","invalidToken"),
    IOEXCEPTION(405,"IO_EXCEPTION","입출력에서 예외가 발생하였습니다."),

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
    PASSWORD_NOT_MATCH(1006,"EMAIL_003"," 입력한 비밀번호가 원래 비밀번호가 일치하지않습니다. "),
    USERNAME_ALREADY_EXIST(1007,"USER NAME ALREADY EXIST","이미 존재하는 닉네임 입니다. "),
    UID_NOT_EXIST(1008,"UID NOT EXIST","존재하지 않는 id 값입니다. "),
    PASSWORD_EMOJI_EXCEPTION(1009,"PASSWORD_EMOJI_EXCEPTION","비밀번호에 이모지가 존재합니다. "),
    PASSWORD_INVALID_EXCEPTION(1010,"PASSWORD_INVALID_EXCEPTION","비밀번호가 8~25자 가 아니거나 특수문자나 영어 숫자가 최소 1개 이상 포함되어있지 않습니다. "),
    PASSWORD_BLANK_EXCEPTION(1011,"BLANK_FOUNDED_EXCEPTION","비밀번호에 공백이 발견되었습니다."),
    NAME_INVALID_EXCEPTION(1012,"NAME NOT VALID EXCEPTION","이름이 0자이거나 10자를 초과하였습니다."),
    NICKNAME_INVALID_EXCEPTION(1013,"NICKNAME NOT VALID EXCEPTION","닉네임이 0자이거나 16자를 초과하였습니다."),
    MESSAGE_INVALID_EXCEPTION(1014,"MESSAGE NOT VALID EXCEPTION","한줄 메세지가 0자이거나 25자를 초과하였습니다."),



    //1100~1199 이메일 로그인 대한 예외

    EMAIL_NOT_EXIST(1101,"EMAIL NOT EXIST","존재하지 않는 이메일 입니다."),
    LOGIN_FAILED_BY_PASSWORD(1102,"PASSWORD INCORRECT","비밀번호가 이메일과 일치하지않습니다."),

    URL_MALFORMED_EXCEPTION(1200,"URL NOT VALID EXCEPTION","유효하지 않은 이미지 URL입니다."),
    // 1300~1399 카카오 로그인 회원가입에 대한 예외
    KAKAO_COMMUNICATION_FAILED(1300,"KAKAO_01","카카오와 http통신이 실패하였습니다."),
    KAKAKO_USER_ALREADY_EXIST(1301,"KAKAKO_USER ALREADY EXIST","이미 존재하는 카카오 유저입니다."),
    KAKAO_NOT_EXIST(1302,"KAKAO_USER_NOT_EXIST","카카오 유저가 아닙니다."),



    // 1400~1499 네이버 로그인 회원가입에 대한 예외
    NAVER_COMMUNICATION_FAILED(1400,"NAVER_01","네이버와 http통신이 실패하였습니다."),
    NAVER_USER_ALREADY_EXIST(1401,"NAVER_USER ALREADY EXIST","이미 존재하는 네이버 유저입니다."),
    NAVER_NOT_EXIST(1402,"NAVER_USER_NOT_EXIST","네이버 유저가 아닙니다."),

    //1500~1599 S3에 관련된 예외
    S3_UPLOAD_FAIL(1501,"S3 UPLOAD FAIL","S3에 업로드하는것을 실패하였습니다."),
    S3_FILE_NOT_FOUND(1502,"S3 FILE NOT FOUND","S3에 업로드할 파일을 찾을 수 없습니다."),





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
    NOT_VALID_TOTAL_CREW(2106,"NOT VALID RECRUITED CREW", "총모집인원이 0명이하입니다."),
    OVER_TOTAL_CREW(2107,"NOT VALID TOTAL CREW", "총모집인원이 10명보다 큽니다."),
    OVER_RECRUITED_CREW(2108,"OVER RECRUITED CREW", "모집된 인원이 총모집인원보다 많습니다."),
    NOT_VALID_EXPIRED_DATE(2109," NOT VALID EXPIRED DATE", "만료날짜가 오늘날짜보다 이전이거나 오늘입니다."),
    NOT_MATCH_UID(2110, "NOT MATCH UID", "요청한 유저와 응답한 결과의 유저가 다릅니다."),
    NOT_VALID_UID(2111, "NOT VALID UID", "존재하지 않는 유저입니다."),
    NOT_MATCh_BOARD_ID(2112, "NOT BOARD ID", "요청한 게시판 번호와 응답한 결과의 게시판 번호가 다릅니다"),



    // 3. 2201~2299 게시판 삭제에 대한 예외
    NOT_EXIST_BOARD_IN_ID(2201, "NOT EXIST_BOARD IN ID", "존재하지 않는 게시글 번호입니다."),

    // 4. 2300~2399 게시판 조건 조회에 대한 예외
    NOT_EXIST_ORDER_KEYWORD(2301, "NOT EXIST ORDER KEYWORD", "올바른 정렬 조건이 아닙니다."),


    // 5. 2400~2499 지원서 조회 및 조회에 대한 예외
    NOT_EXIST_UID_TO_APPLY(2400, "NOT EXIST UID TO APPLY", "존재하지 않는 회원이 지원했습니다."),
    NOT_EXIST_BOARD_TO_APPLY(2401, "NOT EXIST BOARD TO APPLY", "존재하지 않는 게시판에 지원했습니다."),
    APPLY_TO_EXPIRED_BOARD(2402, "APPLY TO EXPIRED BOARD", "만료된 게시판(날짜 혹은 인원만료)에 지원헀습니다."),
    DUPLICATE_APPLIER(2403, "DUPLICATE APPLIER", "중복 지원했습니다."),
    APPLY_TO_BOARD_WRITER(2404, "APPLY TO BOARD WRITER", "게시판 작성자가 지원했습니다."),
    NOT_CATEGORY_PARENT_ID(2405, "NOT_CATEGORY_PARENT_ID", "부모 카테고리로 지원서 조회를 요청하지 않았습니다."),
    NOT_MATCH_BOARD_OWNER(2406, "NOT_MATCH_BOARD_OWNER", "게시판 작성자가 조회하지 않았습니다."),
    NOT_EXIST_APPLY(2407, "NOT_EXITS_APPLY", "존재하지 않는 신청서입니다."),


    // 3000~3100 마이페이지 예외
    EMPTY_CATEGORY_EXCEPTION(3001, "CATEGORY IS EMPTY", "카테고리가 선택되지 않았습니다."),
    EMPTY_NICKNAME_EXCEPTION(3002, "NICKNAME IS EMPTY", "닉네임이 입력되지 않았습니다."),
    EMPTY_NAME_EXCEPTION(3003, "NAME IS EMPTY", "이름이 입력되지 않았습니다."),
    EMPTY_MESSAGE_EXCEPTION(3004, "MESSAGE IS EMPTY", "메세지가 입력되지 않았습니다."),
    CATEGORY_STUDY_NULL_EXCEPTION(3005,"CATEGORY STUDY IS NULL","카테고리에서 스터디 항목이 선택되지 않았습니다."),
    CATEGORY_HOBBY_NULL_EXCEPTION(3006,"CATEGORY STUDY IS NULL","카테고리에서 취미 항목이 선택되지 않았습니다."),

    // 4000~ 북마크 예외
    NOT_EXIST_BOOKMARK_TO_CANCEL(4001, "BOOKMARK IS EMPTY", "없는 북마크를 삭제하려고 했습니다."),
    ALREADY_EXIST_BOOKMARK_TO_POST(4002, "BOOKMARK IS ALREADY EXIST", "이미 존재하는 북마크를 생성하도록 요청했습니다."),

    NOT_MATCH_UID_WITH_BOOKMARK(4101, "UID IS NOT MATCH WITH BOOKMARK", "해당 북마크에 대한 권한이 없는 유저가 북마크 삭제를 요청했습니다."),

    NOT_EXIST_LOGINED_USER(4201, "USER IS NOT EXIST", "로그인하지 않은 상태로 북마크 관련 요청을 했습니다."),


    //5000~ 채팅 예외

    CHAT_NOT_ALLOWED_USER(5001, "THIS USER IS NOT ALLOWED TO TALK THIS CHATROOM", "현재 방에 참여하지않은 유저입니다.");



    private int status;
    private final String code;
    private final String message;
    private final boolean error;

    ErrorCode( int status,String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.error = true;
    }

    public boolean getError() {
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
