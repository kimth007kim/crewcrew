package matchTeam.crewcrew.response.exception;


public class CKakaoCommunicationException extends RuntimeException{
    public CKakaoCommunicationException() { super();
    }

    public CKakaoCommunicationException(String message) {
        super(message);
    }

    public CKakaoCommunicationException(String message, Throwable cause) {
        super(message, cause);
    }
}