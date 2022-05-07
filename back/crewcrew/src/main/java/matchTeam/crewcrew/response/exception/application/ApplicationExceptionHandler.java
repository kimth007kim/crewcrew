package matchTeam.crewcrew.response.exception.application;

import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ErrorResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationExceptionHandler {

//    제목이 비어있을 때 발생하는 예외
    @ExceptionHandler(NotExistUidToApplyException.class)
    protected ResponseEntity<ErrorResponseHandler> notExistUidToApplyException(NotExistUidToApplyException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_EXIST_UID_TO_APPLY);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(NotExistBoardIdToApplyException.class)
    protected ResponseEntity<ErrorResponseHandler> notExistBoardIdToApplyException(NotExistBoardIdToApplyException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_EXIST_BOARD_TO_APPLY);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(ApplyToExpiredBoardException.class)
    protected ResponseEntity<ErrorResponseHandler> applyToExpiredBoardException(ApplyToExpiredBoardException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.APPLY_TO_EXPIRED_BOARD);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(DuplicateApplierException.class)
    protected ResponseEntity<ErrorResponseHandler> duplicateApplierException(DuplicateApplierException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.DUPLICATE_APPLIER);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(ApplyToBoardWriterException.class)
    protected ResponseEntity<ErrorResponseHandler> applyToBoardWriterException(ApplyToBoardWriterException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.APPLY_TO_BOARD_WRITER);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(NotCategoryParentIdException.class)
    protected ResponseEntity<ErrorResponseHandler> notCategoryParentIdException(NotCategoryParentIdException e) {
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_CATEGORY_PARENT_ID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
