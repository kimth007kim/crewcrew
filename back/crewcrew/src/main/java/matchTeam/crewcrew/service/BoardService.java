package matchTeam.crewcrew.service;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.dto.board.BoardSaveResponseDTO;
import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.util.customException.CategoryNotFoundException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        Board board = boardRepository.save(
                Board.builder()
                        .title(req.getTitle())
                        .boardContent(req.getBoardContent())
                        .approach(req.getApproach())
                        .recruitedCrew(req.getRecruitedCrew())
                        .totalCrew(req.getTotalCrew())
                        .user(user)
                        .category(category)
                        .build()
        );

        return BoardSaveResponseDTO.builder()
                .rep(board)
                .build();
    }

}
