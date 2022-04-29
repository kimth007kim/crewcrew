package matchTeam.crewcrew.response.exception.auth;

public class MessageInvalidException extends RuntimeException {
    public MessageInvalidException() {
        super();
    }

    public MessageInvalidException(String message) {
        super(message);
    }

    public MessageInvalidException(String message, Throwable cause) {
        super(message, cause);
    }
}