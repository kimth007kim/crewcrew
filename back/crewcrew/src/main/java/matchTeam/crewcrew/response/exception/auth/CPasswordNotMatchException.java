package matchTeam.crewcrew.response.exception.auth;

public class CPasswordNotMatchException extends RuntimeException {
    public CPasswordNotMatchException() {
        super();
    }

    public CPasswordNotMatchException(String message) {
        super(message);
    }

    public CPasswordNotMatchException(String message, Throwable cause) {
        super(message, cause);
    }
}