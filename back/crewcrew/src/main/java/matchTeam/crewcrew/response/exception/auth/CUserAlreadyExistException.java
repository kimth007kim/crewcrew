package matchTeam.crewcrew.response.exception.auth;

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
