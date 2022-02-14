package matchTeam.crewcrew.response.exception.auth;

public class CNaverCommunicationException extends RuntimeException{
    public CNaverCommunicationException() { super();
    }

    public CNaverCommunicationException(String message) {
        super(message);
    }

    public CNaverCommunicationException(String message, Throwable cause) {
        super(message, cause);
    }
}
