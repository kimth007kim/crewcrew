package matchTeam.crewcrew.response.exception.auth;

public class NickNameAlreadyExistException extends RuntimeException {
    public NickNameAlreadyExistException() {
        super();
    }

    public NickNameAlreadyExistException(String message) {
        super(message);
    }

    public NickNameAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}