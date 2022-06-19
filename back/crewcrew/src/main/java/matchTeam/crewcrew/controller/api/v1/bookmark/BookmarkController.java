package matchTeam.crewcrew.controller.api.v1.bookmark;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.*;
import matchTeam.crewcrew.dto.bookmark.BookmarkSaveResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.bookmark.Bookmark;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import matchTeam.crewcrew.service.board.BoardService;
import matchTeam.crewcrew.service.bookmark.BookmarkService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Bookmark Controller", tags = "8. bookmark")
@RequiredArgsConstructor
@RestController
public class BookmarkController {
    private final BookmarkService bookmarkService;
    private final UserService userService;
    private final BoardRepository boardRepository;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/bookmark/{boardId}")
    public ResponseEntity<Object> saveBookmark(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable Long boardId){
        User user = userService.tokenChecker(token);
        Long userId = user.getUid();

        //유효한 리퀘스트인지 확인
        bookmarkService.checkValidSave(userId, boardId);
        BookmarkSaveResponseDTO saveBookmark = bookmarkService.save(boardId, userId);
        return ResponseHandler.generateResponse("북마크 저장 성공", HttpStatus.OK, saveBookmark);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping(value = "/bookmark/{boardId}")
    public ResponseEntity<Object> cancelBookmark(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable Long boardId){
        User user = userService.tokenChecker(token);
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new CrewException(ErrorCode.NOT_EXIST_BOARD_IN_ID));
        bookmarkService.cancelBookmark(board, user);
        return ResponseHandler.generateResponse(boardId+ "번 게시물에 대한 북마크 삭제 성공", HttpStatus.OK, boardId);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/bookmark/{boardId}")
    public ResponseEntity<Object> getIsBookmarked(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable Long boardId){
        User user = userService.tokenChecker(token);
        boardRepository.findById(boardId).orElseThrow(NotExistBoardInIdException::new);
        boolean isBookmarked = bookmarkService.checkIsBookmarked(user.getUid(), boardId);
        return ResponseHandler.generateResponse("게시물 북마크 여부 조회 성공", HttpStatus.OK, isBookmarked);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/bookmark/list")
    public ResponseEntity<Object> getBookmarkList(@RequestHeader("X-AUTH-TOKEN") String token, @PageableDefault(size = 5) Pageable pageable){
        User user = userService.tokenChecker(token);
        Page<BoardPageDetailResponseDTO> result = bookmarkService.search(user.getUid(), pageable);
        BoardPageResponseDTO pageResponseDTO = BoardPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("북마크된 게시글 리스트 조회 성공", HttpStatus.OK, pageResponseDTO);
    }

    /*@GetMapping("/bookmark/test")
    public ResponseEntity<Object> getBookmarked(@RequestParam Long userId, @RequestParam Long boardId){
        boolean result = bookmarkService.checkIsBookmarked(userId, boardId);
        System.out.println(result);
        return ResponseHandler.generateResponse("북마크 체크 기능 작동 확인", HttpStatus.OK, result);
    }*/
}
