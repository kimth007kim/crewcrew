package matchTeam.crewcrew.service.board;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.dto.board.BoardSaveResponseDTO;
import matchTeam.crewcrew.dto.board.BoardUpdateRequestDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.board.*;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final Integer[] approachCode = {0, 1};

    @Transactional
    public BoardSaveResponseDTO save(BoardSaveRequestDTO req){

        User user = userRepository.findById(req.getUid()).orElseThrow(UserNotFoundException::new);
        Category category = categoryRepository.findById(req.getCategoryId()).orElseThrow(NotExistCategoryException::new);

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
                .orElseThrow(NotExistBoardInIdException::new);

        Category category = categoryRepository.findById(req.getCategoryId())
                        .orElseThrow(NotExistCategoryException::new);

        beforeExpiredDate(req.getExpiredDate());

        board.update(req.getTitle(), req.getBoardContent(),
                req.getRecruitedCrew(), req.getTotalCrew(), req.getApproachCode(),
               category, req.getExpiredDate());

        return id;
    }

    @Transactional
    public void delete(Long id){
        Board board = boardRepository.findById(id)
                .orElseThrow(NotExistBoardInIdException::new);

        boardRepository.delete(board);
    }

    public BoardResponseDTO findById(Long id){
        Board findBoard = boardRepository.findById(id)
                .orElseThrow(NotExistBoardInIdException::new);

        return new BoardResponseDTO(findBoard);
    }

    public void checkValidSave(BoardSaveRequestDTO saveRequestDTO){
        //제목이 비어있을 경우
        if (saveRequestDTO.getTitle().isBlank()) {
            throw new NoTitleException();
        }// 본문 내용이 비어있을 경우
        else if (saveRequestDTO.getBoardContent().isBlank()) {
            throw new NoContentException();
        }else if(! Arrays.stream(approachCode).anyMatch(saveRequestDTO.getApproachCode()::equals)){
            throw new NotValidApproachException();
        } else if(saveRequestDTO.getCategoryId() == null){
            throw new NotSelectCategoryException();
        } else if (saveRequestDTO.getCategoryId() == 1 || saveRequestDTO.getCategoryId() == 2) {
            throw new NotSelectChildCategoryException();
        } else if (saveRequestDTO.getRecruitedCrew() <= 0){
            throw new NotValidRecruitedCrewException();
        } else if(saveRequestDTO.getTotalCrew() <= 0){
            throw new NotValidTotalCrewException();
        }else if (saveRequestDTO.getRecruitedCrew() > saveRequestDTO.getTotalCrew()){
            throw new OverRecruitedCrewException();
        }

        categoryRepository.findById(saveRequestDTO.getCategoryId())
                    .orElseThrow(NotExistCategoryException::new);

        beforeExpiredDate(saveRequestDTO.getExpiredDate());

    }

    public void checkValidUpdate(BoardUpdateRequestDTO updateRequestDTO){
        //제목이 비어있을 경우
        if (updateRequestDTO.getTitle().isBlank()) {
            throw new NoTitleException();
        }// 본문 내용이 비어있을 경우
        else if (updateRequestDTO.getBoardContent().isBlank()) {
            throw new NoContentException();
        }else if(! Arrays.stream(approachCode).anyMatch(updateRequestDTO.getApproachCode()::equals)){
            throw new NotValidApproachException();
        }else if(updateRequestDTO.getCategoryId() == null){
            throw new NotSelectCategoryException();
        } else if (updateRequestDTO.getCategoryId() == 1 || updateRequestDTO.getCategoryId() == 2) {
            throw new NotSelectChildCategoryException();
        } else if (updateRequestDTO.getRecruitedCrew() <= 0){
            throw new NotValidRecruitedCrewException();
        } else if(updateRequestDTO.getTotalCrew() <= 0){
            throw new NotValidTotalCrewException();
        }else if (updateRequestDTO.getRecruitedCrew() > updateRequestDTO.getTotalCrew()){
            throw new OverRecruitedCrewException();
        }
        categoryRepository.findById(updateRequestDTO.getCategoryId())
                .orElseThrow(NotExistCategoryException::new);

        beforeExpiredDate(updateRequestDTO.getExpiredDate());

    }

    public void checkMathchingUid(Long requestUid, Long responseUid){
        if (! requestUid.equals(requestUid)){
            throw new NotMatchUidException();
        }

    }

    public void checkMathchingBoardId(Long requestBoardId, Long responseBoardId){
        if (! requestBoardId.equals(responseBoardId)){
            throw new NotMatchBoardIdException();
        }

    }

    public void beforeExpiredDate(LocalDate reqDate){
        if (reqDate.compareTo(getTodayDate()) <= 0){
            throw new NotValidExpiredDateException();
        }

    }

    public LocalDate getTodayDate(){
        return LocalDate.now();
    }

}
