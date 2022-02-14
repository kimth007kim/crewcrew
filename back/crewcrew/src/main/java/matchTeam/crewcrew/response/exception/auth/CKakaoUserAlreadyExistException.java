package matchTeam.crewcrew.response.exception.auth;

public class CKakaoUserAlreadyExistException extends RuntimeException {
    public CKakaoUserAlreadyExistException() {
        super();
    }

    public CKakaoUserAlreadyExistException(String message) {
        super(message);
    }

    public CKakaoUserAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}