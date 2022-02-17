package matchTeam.crewcrew.service.board;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.repository.board.BoardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class BoardHitService {
    private final BoardRepository boardRepository;

    @Transactional
    public void updateHit(Long id){
        boardRepository.updateHitByBoardId(id);
    }
}
