package matchTeam.crewcrew.response.exception.board;

import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ErrorResponseHandler;
import matchTeam.crewcrew.response.exception.category.CategoryNotFoundException;
import matchTeam.crewcrew.response.exception.category.SelectCategoryException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BoardExceptionHandler {
    /**
     * 번호로 조회할 경우 해당 게시판이 존재하지 않을 때의 예외처리
     */
    @ExceptionHandler(BoardNotFoundException.class)
    protected ResponseEntity<ErrorResponseHandler> findBoardFailedException(BoardNotFoundException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.BOARD_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 존재하지 않은 카테고리 번호로 게시판을 생성할 때의 예외처리
     */
    @ExceptionHandler(CategoryNotFoundException.class)
    protected ResponseEntity<ErrorResponseHandler> categoryNotFoundException(CategoryNotFoundException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.CATEGOTY_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    /*
     * 만료 날짜가 현재 날짜보다 작을때
     * */
    @ExceptionHandler(ExpiredDateBeforeTodayException.class)
    protected ResponseEntity<ErrorResponseHandler> beforeExpiredDate(ExpiredDateBeforeTodayException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EXPIRED_DATE_BEFORE_TODAY);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
