package matchTeam.crewcrew.response.exception.auth;

public class CNaverUserAlreadyExistException extends RuntimeException {
    public CNaverUserAlreadyExistException() {
        super();
    }

    public CNaverUserAlreadyExistException(String message) {
        super(message);
    }

    public CNaverUserAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}