package matchTeam.crewcrew.service.board;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.dto.board.BoardSaveResponseDTO;
import matchTeam.crewcrew.dto.board.BoardUpdateRequestDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.BoardApproach;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.board.BoardNotFoundException;
import matchTeam.crewcrew.response.exception.board.CategoryNotFoundException;
import matchTeam.crewcrew.response.exception.board.ExpiredDateBeforeTodayException;
import matchTeam.crewcrew.response.exception.board.SelectCategoryException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public BoardSaveResponseDTO save(BoardSaveRequestDTO req){

        User user = userRepository.findById(req.getUserId()).orElseThrow(UserNotFoundException::new);
        Category category = categoryRepository.findById(req.getCategoryId()).orElseThrow(CategoryNotFoundException::new);

        //오늘 날짜보다 만료 날짜가 작을때
        beforeExpiredDate(req.getExpiredDate());

        System.out.println("req.getExpiredDate().getClass().getName() = " + req.getExpiredDate().getClass().getName());
        Board board = boardRepository.save(
                req.toEntity(req, userRepository, categoryRepository)
        );

        return BoardSaveResponseDTO.builder()
                .res(board)
                .build();
    }

    @Transactional
    public Long update(Long id, BoardUpdateRequestDTO req){
        Board board = boardRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        Category category = categoryRepository.findById(req.getCategoryId())
                        .orElseThrow(CategoryNotFoundException::new);

        beforeExpiredDate(req.getExpiredDate());

        board.update(req.getTitle(), req.getBoardContent(),
                req.getRecruitedCrew(), req.getTotalCrew(), req.getApproachCode(),
               category, req.getExpiredDate());

        return id;
    }

    public BoardResponseDTO findById(Long id){
        Board findBoard = boardRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        return new BoardResponseDTO(findBoard);
    }

    public void beforeExpiredDate(LocalDate reqDate){
        if (reqDate.isBefore(getTodayDate())){
            throw new ExpiredDateBeforeTodayException();
        }

    }
    public LocalDate getTodayDate(){
        return LocalDate.now();
    }

}
