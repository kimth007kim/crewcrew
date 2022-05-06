package matchTeam.crewcrew.response.exception.profile;

public class ProfileEmptyCategoryException extends RuntimeException{
    public ProfileEmptyCategoryException() { super();
    }

    public ProfileEmptyCategoryException(String message) {
        super(message);
    }

    public ProfileEmptyCategoryException(String message, Throwable cause) {
        super(message, cause);
    }
}
