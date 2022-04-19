package matchTeam.crewcrew.response.exception.auth;

public class NaverUserNotExistException extends RuntimeException {
    public NaverUserNotExistException() {
    }

    public NaverUserNotExistException(String message) {
        super(message);
    }

    public NaverUserNotExistException(String message, Throwable cause) {
        super(message, cause);
    }
}