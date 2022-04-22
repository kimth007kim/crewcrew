package matchTeam.crewcrew.response.exception.auth;

public class PasswordEmojiException extends RuntimeException {
    public PasswordEmojiException() {
        super();
    }

    public PasswordEmojiException(String message) {
        super(message);
    }

    public PasswordEmojiException(String message, Throwable cause) {
        super(message, cause);
    }
}