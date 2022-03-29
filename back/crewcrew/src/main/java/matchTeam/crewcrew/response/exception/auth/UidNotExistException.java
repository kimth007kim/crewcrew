package matchTeam.crewcrew.response.exception.auth;

public class UidNotExistException extends RuntimeException {
    public UidNotExistException() {
        super();
    }

    public UidNotExistException(String message) {
        super(message);
    }

    public UidNotExistException(String message, Throwable cause) {
        super(message, cause);
    }
}