package matchTeam.crewcrew.response.exception.auth;

public class PasswordBlankException extends RuntimeException {
    public PasswordBlankException() {
        super();
    }

    public PasswordBlankException(String message) {
        super(message);
    }

    public PasswordBlankException(String message, Throwable cause) {
        super(message, cause);
    }
}