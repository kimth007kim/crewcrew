package matchTeam.crewcrew.response.exception.profile;

public class ProfileEmptyNickNameException extends RuntimeException{
    public ProfileEmptyNickNameException() { super();
    }

    public ProfileEmptyNickNameException(String message) {
        super(message);
    }

    public ProfileEmptyNickNameException(String message, Throwable cause) {
        super(message, cause);
    }
}
