package matchTeam.crewcrew.service;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.BoardDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.util.customException.BoardNotFound;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public BoardDTO getBoard(Long boardSeq){
        Optional<Board> findId = boardRepository.findById(boardSeq);

        Board findPost = findId.orElseThrow(() -> new BoardNotFound("해당 게시물이 존재하지 않습니다."));

        return  BoardDTO.builder()
                .title(findPost.getTitle())
                .boardContent(findPost.getBoardContent())
                .recruitedCrew(findPost.getRecruitedCrew())
                .totalCrew(findPost.getTotalCrew())
                .url(findPost.getUrl())
                .build();
    }

}
