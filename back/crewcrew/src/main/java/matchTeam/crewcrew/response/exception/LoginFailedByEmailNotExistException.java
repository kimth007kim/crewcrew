package matchTeam.crewcrew.response.exception;

public class LoginFailedByEmailNotExistException extends RuntimeException{
    public LoginFailedByEmailNotExistException(){
        super();
    }
    public LoginFailedByEmailNotExistException(String message){
        super(message);
    }

    public LoginFailedByEmailNotExistException(String message,Throwable cause){
        super(message,cause);
    }
}

