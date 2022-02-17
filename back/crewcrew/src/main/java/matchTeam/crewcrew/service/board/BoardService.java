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
import matchTeam.crewcrew.response.exception.board.*;
import matchTeam.crewcrew.response.exception.category.CategoryNotFoundException;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
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

    @Transactional
    public BoardSaveResponseDTO save(BoardSaveRequestDTO req){

        User user = userRepository.findById(req.getUid()).orElseThrow(UserNotFoundException::new);
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

    @Transactional
    public void delete(Long id){
        Board board = boardRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        boardRepository.delete(board);
    }

    public BoardResponseDTO findById(Long id){
        Board findBoard = boardRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        return new BoardResponseDTO(findBoard);
    }
    public void validSaveCheck(BoardSaveRequestDTO saveRequestDTO){
        //제목이 비어있을 경우
        if (saveRequestDTO.getTitle() == null) {
            throw new NoTitleException();
        }// 본문 내용이 비어있을 경우
        else if (saveRequestDTO.getBoardContent() == null) {
            throw new NoContentException();
        }else if(saveRequestDTO.getApproach() != BoardApproach.APPROACH_OFFLINE || saveRequestDTO.getApproach() != BoardApproach.APPROACH_ONLINE){
            throw new NotValidApproachException();
        }else if(saveRequestDTO.getCategoryId() == null){
            throw new NotSelectCategoryException();
        } else if (saveRequestDTO.getCategoryId() == 1 || saveRequestDTO.getCategoryId() == 2) {
            throw new NotSelectChildCategoryException();
        } else if (saveRequestDTO.getRecruitedCrew() <= 0){
            throw new NotValidRecruitedCrewException();
        } else if(saveRequestDTO.getTotalCrew() <= 0){
            throw new NotValidTotalCrewException();
        }else if (saveRequestDTO.getRecruitedCrew() > saveRequestDTO.getTotalCrew()){
            throw new OverRecruitedCrewException();
        }else{
            categoryRepository.findById(saveRequestDTO.getCategoryId())
                    .orElseThrow(NotExistCategoryException::new);
            beforeExpiredDate(saveRequestDTO.getExpiredDate());
        }
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
