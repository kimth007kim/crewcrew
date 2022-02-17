package matchTeam.crewcrew.response.exception.category;

import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ErrorResponseHandler;
import matchTeam.crewcrew.response.exception.board.BoardNotFoundException;
import matchTeam.crewcrew.response.exception.board.ExpiredDateBeforeTodayException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CategoryExceptionHandler {
    /**
     * 존재하지 않은 카테고리 번호로 게시판을 생성할 때의 예외처리
     */
    @ExceptionHandler(CategoryNotFoundException.class)
    protected ResponseEntity<ErrorResponseHandler> categoryNotFoundException(CategoryNotFoundException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.CATEGOTY_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 상세 카테고리를 지정하지 않았을때
     */
    @ExceptionHandler(SelectCategoryException.class)
    protected ResponseEntity<ErrorResponseHandler> notSelectDetailCategory(SelectCategoryException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_SELECT_DETAIL_CATEGORY);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
