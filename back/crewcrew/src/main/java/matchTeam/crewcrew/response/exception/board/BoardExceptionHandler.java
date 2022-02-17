package matchTeam.crewcrew.response.exception.board;

import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ErrorResponseHandler;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BoardExceptionHandler {

//    제목이 비어있을 때 발생하는 예외
    @ExceptionHandler(NoTitleException.class)
    protected ResponseEntity<ErrorResponseHandler> noTitleException(NoTitleException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NO_TITLE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    본문 내용이 비어있을 때 발생하는 예외
    @ExceptionHandler(NoContentException.class)
    protected ResponseEntity<ErrorResponseHandler> noContentException(NoContentException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NO_CONTENT);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    온라인/오프라인 여부를 선택하지 않았을 때 발생하는 예외
    @ExceptionHandler(NotValidApproachException.class)
    protected ResponseEntity<ErrorResponseHandler> notValidApproachException(NotValidApproachException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_VALID_APPROACH);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    카테고리를 선택하지 않았을 때 발생하는 예외
    @ExceptionHandler(NotSelectCategoryException.class)
    protected ResponseEntity<ErrorResponseHandler> notSelectCategoryException(NotSelectCategoryException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_SELECT_CATEGORY);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    부모 카테고리만 선택했을 경우 예외
    @ExceptionHandler(NotSelectChildCategoryException.class)
    protected ResponseEntity<ErrorResponseHandler> notSelectChildCategoryException(NotSelectChildCategoryException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_SELECT_CHILD_CATEGORY);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    모집하는 인원이 0이하일 때의 예외
    @ExceptionHandler(NotValidRecruitedCrewException.class)
    protected ResponseEntity<ErrorResponseHandler> notValidRecruitedCrewException(NotValidRecruitedCrewException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_VALID_RECRUITED_CREW);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    총인원이 0이하일 때의 예외
    @ExceptionHandler(NotValidTotalCrewException.class)
    protected ResponseEntity<ErrorResponseHandler> notValidTotalCrewException(NotValidTotalCrewException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_VALID_TOTAL_CREW);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    모집인원이 총인원보다 클때의 예외
    @ExceptionHandler(OverRecruitedCrewException.class)
    protected ResponseEntity<ErrorResponseHandler> overRecruitedCrewException(OverRecruitedCrewException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.OVER_RECRUITED_CREW);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    만료날짜가 오늘보다 이전일때의 예외
    @ExceptionHandler(NotValidExpiredDateException.class)
    protected ResponseEntity<ErrorResponseHandler> notValidExpiredDateException(NotValidExpiredDateException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_VALID_EXPIRED_DATE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    요청한 uid가 게시판을 작성한 uid와 다를 때의 예외
    @ExceptionHandler(NotMatchUidException.class)
    protected ResponseEntity<ErrorResponseHandler> notMatchUidException(NotMatchUidException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_MATCH_UID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(NotExistBoardInIdException.class)
    protected ResponseEntity<ErrorResponseHandler> notExistBoardInIdException(NotExistBoardInIdException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_EXIST_BOARD_IN_ID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(UserNotFoundException.class)
    protected ResponseEntity<ErrorResponseHandler> notExistBoardInIdException(UserNotFoundException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_VALID_UID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(NotMatchBoardIdException.class)
    protected ResponseEntity<ErrorResponseHandler> notMatchBoardIdException(NotMatchBoardIdException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NOT_MATCh_BOARD_ID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
