package matchTeam.crewcrew.response.exception.auth;

public class MalformedURLImageException extends RuntimeException {
    public MalformedURLImageException() {
        super();
    }

    public MalformedURLImageException(String message) {
        super(message);
    }

    public MalformedURLImageException(String message, Throwable cause) {
        super(message, cause);
    }
}