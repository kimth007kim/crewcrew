package matchTeam.crewcrew.response.exception.profile;

public class ProfileEmptyNameException extends RuntimeException{
    public ProfileEmptyNameException() { super();
    }

    public ProfileEmptyNameException(String message) {
        super(message);
    }

    public ProfileEmptyNameException(String message, Throwable cause) {
        super(message, cause);
    }
}
