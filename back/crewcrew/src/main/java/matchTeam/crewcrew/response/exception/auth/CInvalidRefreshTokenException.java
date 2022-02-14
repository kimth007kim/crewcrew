package matchTeam.crewcrew.response.exception.auth;

public class CInvalidRefreshTokenException extends RuntimeException {
    public CInvalidRefreshTokenException() {
        super();
    }

    public CInvalidRefreshTokenException(String message) {
        super(message);
    }

    public CInvalidRefreshTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}