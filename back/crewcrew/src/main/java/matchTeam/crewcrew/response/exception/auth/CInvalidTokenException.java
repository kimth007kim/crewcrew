package matchTeam.crewcrew.response.exception.auth;

public class CInvalidTokenException extends RuntimeException {
    public CInvalidTokenException() {
        super();
    }

    public CInvalidTokenException(String message) {
        super(message);
    }

    public CInvalidTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}