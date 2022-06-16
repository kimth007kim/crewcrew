package matchTeam.crewcrew.service.bookmark;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.dto.board.BoardSaveResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSpecs;
import matchTeam.crewcrew.dto.bookmark.BookmarkSaveRequestDTO;
import matchTeam.crewcrew.dto.bookmark.BookmarkSaveResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.bookmark.Bookmark;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.bookmark.BookmarkRepository;
import matchTeam.crewcrew.repository.bookmark.BookmarkSearchRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import matchTeam.crewcrew.response.exception.board.NotMatchBoardIdException;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BookmarkService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;
    private final BookmarkSearchRepository bookmarkQueryRepository;

    @Transactional
    public BookmarkSaveResponseDTO save(Long boardId, Long uid){

        User user = userRepository.findById(uid).orElseThrow(UserNotFoundException::new);
        Board board = boardRepository.findById(boardId).orElseThrow(NotMatchBoardIdException::new);

        BookmarkSaveRequestDTO req = new BookmarkSaveRequestDTO(boardId, uid);
        Bookmark bookmark = bookmarkRepository.save(
                req.toEntity(user, board)
        );

        return BookmarkSaveResponseDTO.builder()
                .res(bookmark)
                .build();
    }

    public void checkValidSave(Long boardId, Long uid){
        userRepository.findById(uid).orElseThrow(UserNotFoundException::new);
        boardRepository.findById(boardId).orElseThrow(NotExistBoardInIdException::new);
        if (bookmarkQueryRepository.isBookmarked(uid, boardId))
            throw new CrewException(ErrorCode.ALREADY_EXIST_BOOKMARK_TO_POST);
    }

/*    public void cancelBookmark(Long bookmarkId, Long userId){
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new CrewException(ErrorCode.NOT_EXIST_BOOKMARK_TO_CANCEL));
        if (!Objects.equals(bookmark.getUid().getUid(), userId))
            throw new CrewException(ErrorCode.NOT_MATCH_UID_WITH_BOOKMARK);
        bookmarkRepository.delete(bookmark);
    }*/

    public Long cancelBookmark(Board board, User user){
        Bookmark bookmark = bookmarkRepository.findByUidAndBoardId(user, board)
                .orElseThrow(() -> new CrewException(ErrorCode.NOT_EXIST_BOOKMARK_TO_CANCEL));
        if (!Objects.equals(bookmark.getUid().getUid(), user.getUid()))
            throw new CrewException(ErrorCode.NOT_MATCH_UID_WITH_BOOKMARK);
        bookmarkRepository.delete(bookmark);
        return bookmark.getBookmarkId();
    }

    public boolean checkIsBookmarked(Long boardId, Long uid){
        userRepository.findById(uid).orElseThrow(UserNotFoundException::new);
        boardRepository.findById(boardId).orElseThrow(NotExistBoardInIdException::new);
        return bookmarkQueryRepository.isBookmarked(uid, boardId);
    }


    @Transactional(readOnly = true)
    public Page<BoardPageDetailResponseDTO> search(Long userId, Pageable pageable) {
        return bookmarkQueryRepository.search(userId, pageable);
    }

/*    @Transactional
    public void delete(Long id){
        Board board = boardRepository.findById(id)
                .orElseThrow(NotExistBoardInIdException::new);
        boardRepository.delete(board);
    }*/

}
