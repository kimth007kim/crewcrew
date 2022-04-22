package matchTeam.crewcrew.response.exception.auth;

public class PasswordInvalidException extends RuntimeException {
    public PasswordInvalidException() {
        super();
    }

    public PasswordInvalidException(String message) {
        super(message);
    }

    public PasswordInvalidException(String message, Throwable cause) {
        super(message, cause);
    }
}