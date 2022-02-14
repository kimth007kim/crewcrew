package matchTeam.crewcrew.response.exception.auth;

public class EmailSignUpFailedCException extends RuntimeException {
    public EmailSignUpFailedCException(){
        super();
    }
    public EmailSignUpFailedCException(String message){
        super(message);
    }

    public EmailSignUpFailedCException(String message,Throwable cause){
        super(message,cause);
    }
}
