package matchTeam.crewcrew.response.exception.profile;

public class ProfileEmptyMessageNameException extends RuntimeException{
    public ProfileEmptyMessageNameException() { super();
    }

    public ProfileEmptyMessageNameException(String message) {
        super(message);
    }

    public ProfileEmptyMessageNameException(String message, Throwable cause) {
        super(message, cause);
    }
}
