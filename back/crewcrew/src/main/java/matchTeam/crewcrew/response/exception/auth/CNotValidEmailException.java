package matchTeam.crewcrew.response.exception.auth;

public class CNotValidEmailException extends RuntimeException {
    public CNotValidEmailException() {
    }

    public CNotValidEmailException(String message) {
        super(message);
    }

    public CNotValidEmailException(String message, Throwable cause) {
        super(message, cause);
    }
}