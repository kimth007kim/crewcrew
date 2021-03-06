package matchTeam.crewcrew.response;

import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.response.exception.auth.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.ServletException;
import java.io.IOException;
import java.net.MalformedURLException;
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
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.INVALID_INPUT_VALUE);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * @ModelAttribut 으로 binding error 발생시 BindException 발생한다.
     * ref https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-modelattrib-method-args
     */
    @ExceptionHandler(BindException.class)
    protected ResponseEntity<ErrorResponseHandler> handleBindException(BindException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.INVALID_INPUT_VALUE);
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
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.ILLEGAL_STATE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    /**
     * 비즈니스 로직 수행 도중, 해당 도메인 객체의 상태가 로직을 수행할 수 없을 때 발생
     */
    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<ErrorResponseHandler> handleIllegalArgumentException(IllegalArgumentException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.ILLEGAL_ARGUMENT);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * 여기서 작성하지 않은 다른 모든 예외에 대해 처리한다. 이 때 500 status code와 함께 반환한다.
     */

    /**
     * 예외가 발생했는데 아직 지정되지않은 예외일 경우
     */


//    @ExceptionHandler(Exception.class)
//    protected ResponseEntity<ErrorResponseHandler> handleException(Exception e) {
//        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EXCEPTION);
//        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//    }


    /**
     * 토큰에 권한이 부족할경우에 발생하는 예외
     */
    @ExceptionHandler(CAuthenticationEntryPointException.class)
    protected ResponseEntity<ErrorResponseHandler> authenticationEntrypointException(CAuthenticationEntryPointException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.AUTHENTICATION_ENTRY);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 접근이 거부되었을때 발생하는 예외
     */

    @ExceptionHandler(CAccessDeniedException.class)
    protected ResponseEntity<ErrorResponseHandler> accessDeniedException(CAccessDeniedException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.ACCESS_DENIED);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(IOException.class)
    protected ResponseEntity<ErrorResponseHandler> ioException(IOException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.ACCESS_DENIED);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(MalformedURLException.class)
    protected ResponseEntity<ErrorResponseHandler> malformedUrlException(MalformedURLException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.URL_MALFORMED_EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ExceptionHandler(MalformedJwtException.class)
    protected ResponseEntity<ErrorResponseHandler> malformedJwtException(MalformedJwtException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.URL_MALFORMED_EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(SignatureException.class)
    protected ResponseEntity<ErrorResponseHandler> signatureException(SignatureException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.URL_MALFORMED_EXCEPTION);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<ErrorResponseHandler> crewException(CrewException e) {
        final ErrorResponseHandler response = ErrorResponse.of(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @ExceptionHandler(Exception.class)
//    protected ResponseEntity<ErrorResponseHandler> globalException(CrewException e) {
//        final ErrorResponseHandler response = ErrorResponse.of(e.getErrorCode());
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }






}
