package matchTeam.crewcrew.response.exception.auth;

public class CRefreshTokenNotMatchWithInputException extends RuntimeException {
    public CRefreshTokenNotMatchWithInputException() {
        super();
    }

    public CRefreshTokenNotMatchWithInputException(String message) {
        super(message);
    }

    public CRefreshTokenNotMatchWithInputException(String message, Throwable cause) {
        super(message, cause);
    }
}