package matchTeam.crewcrew.response.exception.auth;

public class KakaoUserNotExistException extends RuntimeException {
    public KakaoUserNotExistException() {
    }

    public KakaoUserNotExistException(String message) {
        super(message);
    }

    public KakaoUserNotExistException(String message, Throwable cause) {
        super(message, cause);
    }
}