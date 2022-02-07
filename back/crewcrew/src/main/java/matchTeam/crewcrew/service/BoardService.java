package matchTeam.crewcrew.service;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.dto.board.BoardSaveResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.board.BoardNotFoundException;
import matchTeam.crewcrew.response.exception.board.CategoryNotFoundException;
import matchTeam.crewcrew.response.exception.board.ExpiredDateBeforeTodayException;
import matchTeam.crewcrew.response.exception.board.SelectCategoryException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
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
    private LocalDate todayDate;

    @Transactional
    public BoardSaveResponseDTO save(BoardSaveRequestDTO req){

        User user = userRepository.findById(req.getUserId()).orElseThrow(UserNotFoundException::new);
        Category category = categoryRepository.findById(req.getCategoryId()).orElseThrow(CategoryNotFoundException::new);
        todayDate = getTodayDate();

        //오늘 날짜보다 만료 날짜가 작을때
        if (req.getExpiredDate().isBefore(todayDate)){
            throw new ExpiredDateBeforeTodayException();
        }

        System.out.println("req.getExpiredDate().getClass().getName() = " + req.getExpiredDate().getClass().getName());
        Board board = boardRepository.save(
                req.toEntity(req, userRepository, categoryRepository)
        );

        return BoardSaveResponseDTO.builder()
                .res(board)
                .build();
    }

    public BoardResponseDTO findById(Long id){
        Board findBoard = boardRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        return new BoardResponseDTO(findBoard);
    }

    public LocalDate getTodayDate(){
        return LocalDate.now();
    }

}
