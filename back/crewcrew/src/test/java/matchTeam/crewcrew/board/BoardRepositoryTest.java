package matchTeam.crewcrew.board;

import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.BoardApproach;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.board.BoardNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.slf4j.MDC.clear;

@SpringBootTest
public class BoardRepositoryTest {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @PersistenceContext
    EntityManager em;

    @Test
    void 게시글저장() throws Exception{
        //given
        String title = "테스트 제목 1";
        String boardContent = "테스트 내용1";
        Integer recruitedCrew = 3;
        Integer totalCrew = 7;
        BoardApproach approach = BoardApproach.온라인;

        Board board = boardRepository.save(
                Board.builder()
                        .title(title)
                        .boardContent(boardContent)
                        .recruitedCrew(recruitedCrew)
                        .totalCrew(totalCrew)
                        .approach(approach)
                        .category(categoryRepository.getById(3L))
                        .user(userRepository.getById(1L))
                        .build()
        );

        clear();

        //when
        Board findBoard = boardRepository.findById(board.getId())
                .orElseThrow(BoardNotFoundException::new);

        assertThat(findBoard.getId()).isEqualTo(board.getId());
        assertThat(findBoard.getTitle()).isEqualTo(board.getTitle());

    }
}
