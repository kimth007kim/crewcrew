package matchTeam.crewcrew.response;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.response.exception.*;
import matchTeam.crewcrew.response.exception.board.BoardNotFoundException;
import matchTeam.crewcrew.response.exception.board.CategoryNotFoundException;
import matchTeam.crewcrew.response.exception.board.ExpiredDateBeforeTodayException;
import matchTeam.crewcrew.response.exception.board.SelectCategoryException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class  GlobalExceptionHandler {

    /**
     *  javax.validation.Valid or @Validated 으로 binding error 발생시 발생한다.
     *  HttpMessageConverter 에서 등록한 HttpMessageConverter binding 못할경우 발생
     *  주로 @RequestBody, @RequestPart 어노테이션에서 발생
     */

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorResponseHandler> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.INVALID_INPUT_VALUE, e.getBindingResult());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * @ModelAttribut 으로 binding error 발생시 BindException 발생한다.
     * ref https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-modelattrib-method-args
     */
    @ExceptionHandler(BindException.class)
    protected ResponseEntity<ErrorResponseHandler> handleBindException(BindException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.INVALID_INPUT_VALUE, e.getBindingResult());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * enum type 일치하지 않아 binding 못할 경우 발생
     * 주로 @RequestParam enum으로 binding 못했을 경우 발생
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<ErrorResponseHandler> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {

        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.INVALID_INPUT_VALUE);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * 지원하지 않은 HTTP method 호출 할 경우 발생
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ResponseEntity<ErrorResponseHandler> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {

        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.METHOD_NOT_ALLOWED);
        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    /**
     * Authentication 객체가 필요한 권한을 보유하지 않은 경우 발생합
     */
    @ExceptionHandler(AccessDeniedException.class)
    protected ResponseEntity<ErrorResponseHandler> handleAccessDeniedException(AccessDeniedException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.HANDLE_ACCESS_DENIED);
        return new ResponseEntity<>(response, HttpStatus.valueOf(ErrorCode.HANDLE_ACCESS_DENIED.getStatus()));
    }

    /**
     * 비즈니스 로직 수행 도중, 사용자의 요청 파라미터가 적절하지 않을 때 발생
     */
    @ExceptionHandler(IllegalStateException.class)
    protected ResponseEntity<ErrorResponseHandler> handleIllegalStatementException(IllegalStateException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.ILLEGAL_STATE, e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * 비즈니스 로직 수행 도중, 해당 도메인 객체의 상태가 로직을 수행할 수 없을 때 발생
     */
    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<ErrorResponseHandler> handleIllegalArgumentException(IllegalArgumentException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.ILLEGAL_ARGUMENT, e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * 여기서 작성하지 않은 다른 모든 예외에 대해 처리한다. 이 때 500 status code와 함께 반환한다.
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponseHandler> handleException(Exception e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    /**
     * 로그인을 할때 이메일이 존재하지않을때 예외처리를 발생한다.
     */
    @ExceptionHandler(LoginFailedByEmailNotExistException.class)
    protected ResponseEntity<ErrorResponseHandler> emailLoginFailedException(LoginFailedByEmailNotExistException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.LOGIN_FAILED_BY_EMAIL);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 로그인을 할때 이메일이 존재하지않을때 예외처리를 발생한다.
     */
    @ExceptionHandler(LoginFailedByPasswordException.class)
    protected ResponseEntity<ErrorResponseHandler> loginFailedByPasswordException(LoginFailedByPasswordException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.LOGIN_FAILED_BY_PASSWORD);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    /**
     * 로그인을 할때 이메일이 존재하지않을때 예외처리를 발생한다.
     */
    @ExceptionHandler(EmailSignUpFailedCException.class)
    protected ResponseEntity<ErrorResponseHandler> signUpFailedException(EmailSignUpFailedCException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.SIGN_UP_FAILED);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 번호로 조회할 경우 해당 게시판이 존재하지 않을 때의 예외처리
     */
    @ExceptionHandler(BoardNotFoundException.class)
    protected ResponseEntity<ErrorResponseHandler> findBoardFailedException(BoardNotFoundException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.BOARD_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * 존재하지 않은 카테고리 번호로 게시판을 생성할 때의 예외처리
     */
    @ExceptionHandler(CategoryNotFoundException.class)
    protected ResponseEntity<ErrorResponseHandler> categoryNotFoundException(CategoryNotFoundException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.CATEGOTY_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 상세 카테고리를 지정하지 않았을때
     */
    @ExceptionHandler(SelectCategoryException.class)
    protected ResponseEntity<ErrorResponseHandler> notSelectDetailCategory(SelectCategoryException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_SELECT_DETAIL_CATEGORY);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /*
    * 만료 날짜가 현재 날짜보다 작을때
    * */
    @ExceptionHandler(ExpiredDateBeforeTodayException.class)
    protected ResponseEntity<ErrorResponseHandler> beforeExpiredDate(ExpiredDateBeforeTodayException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EXPIRED_DATE_BEFORE_TODAY);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CAuthenticationEntryPointException.class)
    protected ResponseEntity<ErrorResponseHandler> authenticationEntrypointException(CAuthenticationEntryPointException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.AUTHENTICATION_ENTRY);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CAccessDeniedException.class)
    protected ResponseEntity<ErrorResponseHandler> accessDeniedException(CAccessDeniedException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.ACCESS_DENIED);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
