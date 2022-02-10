package matchTeam.crewcrew.response.exception;

public class CUserAlreadyExistException extends RuntimeException{
    public CUserAlreadyExistException() { super();
    }

    public CUserAlreadyExistException(String message) {
        super(message);
    }

    public CUserAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
