package matchTeam.crewcrew.response.exception.profile;

import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ErrorResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.MalformedURLException;

@RestControllerAdvice

public class ProfileExceptionHandler {


    // 1000~1099 이메일 회원가입 에 대한 예외

    /**
     * 3001
     * 
     * 카테고리가 비어있을때 발생하는 exception
     */
    @ExceptionHandler(ProfileEmptyCategoryException.class)
    protected ResponseEntity<ErrorResponseHandler> profileCategoryNotExistException(ProfileEmptyCategoryException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EMPTY_CATEGORY_EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 3002
     *
     * 닉네임이 비어있을때 발생하는 exception
     */
    @ExceptionHandler(ProfileEmptyNickNameException.class)
    protected ResponseEntity<ErrorResponseHandler> profileNickNameEmptyException(ProfileEmptyNickNameException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EMPTY_NICKNAME_EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 3003
     *
     * 이름이 비어있을때 발생하는 exception
     */
    @ExceptionHandler(ProfileEmptyNameException.class)
    protected ResponseEntity<ErrorResponseHandler> profileNameEmptyException(ProfileEmptyNameException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EMPTY_NAME_EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 3004
     *
     * 메세지가 비어있을때 발생하는 exception
     */
    @ExceptionHandler(ProfileEmptyMessageNameException.class)
    protected ResponseEntity<ErrorResponseHandler> profileMessageEmptyException(ProfileEmptyMessageNameException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EMPTY_MESSAGE_EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
