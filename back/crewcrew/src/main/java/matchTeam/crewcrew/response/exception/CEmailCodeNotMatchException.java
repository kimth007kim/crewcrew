package matchTeam.crewcrew.response.exception;

public class CEmailCodeNotMatchException extends RuntimeException {
    public CEmailCodeNotMatchException() {
        super();
    }

    public CEmailCodeNotMatchException(String message) {
        super(message);
    }

    public CEmailCodeNotMatchException(String message, Throwable cause) {
        super(message, cause);
    }
}