package matchTeam.crewcrew.response.exception;

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
