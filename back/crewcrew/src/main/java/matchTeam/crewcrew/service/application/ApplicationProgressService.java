package matchTeam.crewcrew.service.application;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.repository.board.BoardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ApplicationProgressService {
    private final BoardRepository boardRepository;

    @Transactional
    public void increaseApply(Long boardId){
        boardRepository.IncreaseApplyByBoardId(boardId);
    }

    @Transactional
    public void declinedApply(Long boardId) {
        boardRepository.decreaseApplyByBoardId(boardId);
    }

    @Transactional
    public void completedApply(Long boardId){ boardRepository.increaseRecruitedByBoardId(boardId);}

    @Transactional
    public void canceledApply(Long boardId){
        boardRepository.decreaseApplyByBoardId(boardId);
        boardRepository.decreaseRecruitedByBoardId(boardId);
    }
}
