package matchTeam.crewcrew.response.exception.auth;

public class LoginFailedByPasswordException extends RuntimeException {
    public LoginFailedByPasswordException(){
        super();
    }
    public LoginFailedByPasswordException(String message){
        super(message);
    }

    public LoginFailedByPasswordException(String message,Throwable cause){
        super(message,cause);
    }
}
