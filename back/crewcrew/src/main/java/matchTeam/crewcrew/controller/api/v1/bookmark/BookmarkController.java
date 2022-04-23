package matchTeam.crewcrew.controller.api.v1.bookmark;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.*;
import matchTeam.crewcrew.dto.bookmark.BookmarkSaveResponseDTO;
import matchTeam.crewcrew.entity.bookmark.Bookmark;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.bookmark.BookmarkService;
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/bookmark/{boardId}")
    public ResponseEntity<Object> save(@PathVariable Long boardId, @RequestParam Long userId){
        //유효한 리퀘스트인지 확인
        bookmarkService.checkValidSave(boardId, userId);
        BookmarkSaveResponseDTO saveBookmark = bookmarkService.save(boardId, userId);
        return ResponseHandler.generateResponse("북마크 저장 성공", HttpStatus.OK, saveBookmark);
    }

    @GetMapping("/bookmark/list")
    public ResponseEntity<Object> getBookmarkList(@RequestParam Long userId, @PageableDefault(size = 5) Pageable pageable){
        Page<BoardPageDetailResponseDTO> result = bookmarkService.search(userId, pageable);
        BoardPageResponseDTO pageResponseDTO = BoardPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("북마크된 게시글 리스트 조회 성공", HttpStatus.OK, pageResponseDTO);
    }
}
