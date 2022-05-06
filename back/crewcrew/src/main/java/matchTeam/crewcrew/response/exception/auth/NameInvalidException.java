package matchTeam.crewcrew.response.exception.auth;

public class NameInvalidException extends RuntimeException {
    public NameInvalidException() {
        super();
    }

    public NameInvalidException(String message) {
        super(message);
    }

    public NameInvalidException(String message, Throwable cause) {
        super(message, cause);
    }
}