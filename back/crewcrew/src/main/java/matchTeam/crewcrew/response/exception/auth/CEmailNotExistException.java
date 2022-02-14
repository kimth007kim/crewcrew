package matchTeam.crewcrew.response.exception.auth;

public class CEmailNotExistException extends RuntimeException{
    public CEmailNotExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public CEmailNotExistException(String message) {
        super(message);
    }

    public CEmailNotExistException() {
        super();
    }
}
