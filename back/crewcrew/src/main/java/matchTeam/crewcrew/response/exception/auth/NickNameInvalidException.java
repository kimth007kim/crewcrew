package matchTeam.crewcrew.response.exception.auth;

public class NickNameInvalidException extends RuntimeException {
    public NickNameInvalidException() {
        super();
    }

    public NickNameInvalidException(String message) {
        super(message);
    }

    public NickNameInvalidException(String message, Throwable cause) {
        super(message, cause);
    }
}