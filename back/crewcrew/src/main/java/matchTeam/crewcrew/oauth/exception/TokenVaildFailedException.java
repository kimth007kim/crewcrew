package matchTeam.crewcrew.oauth.exception;

public class TokenVaildFailedException extends RuntimeException {

    public TokenVaildFailedException() {
        super("Failed to generate Token.");
    }

    private TokenVaildFailedException(String message) {
        super(message);
    }
}
