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
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import matchTeam.crewcrew.response.exception.board.NotMatchBoardIdException;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    }

    public boolean checkIsBookmarked(Long uid, Long boardId){
        userRepository.findById(uid).orElseThrow(UserNotFoundException::new);
        boardRepository.findById(boardId).orElseThrow(NotExistBoardInIdException::new);
        return bookmarkQueryRepository.isBookmarked(uid, boardId);
    }

    @Transactional(readOnly = true)
    public Page<BoardPageDetailResponseDTO> search(Long userId, Pageable pageable) {
        return bookmarkQueryRepository.search(userId, pageable);
    }

}
