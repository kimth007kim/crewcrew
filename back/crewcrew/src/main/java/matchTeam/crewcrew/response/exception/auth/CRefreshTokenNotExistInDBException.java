package matchTeam.crewcrew.response.exception.auth;

public class CRefreshTokenNotExistInDBException extends RuntimeException {
    public CRefreshTokenNotExistInDBException() {
        super();
    }

    public CRefreshTokenNotExistInDBException(String message) {
        super(message);
    }

    public CRefreshTokenNotExistInDBException(String message, Throwable cause) {
        super(message, cause);
    }
}
