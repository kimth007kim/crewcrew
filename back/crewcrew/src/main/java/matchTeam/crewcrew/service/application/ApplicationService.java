package matchTeam.crewcrew.service.application;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.ApplicationCountResponseDTO;
import matchTeam.crewcrew.dto.application.ApplicationSaveRequestDTO;
import matchTeam.crewcrew.dto.application.ApplicationSaveResponseDTO;
import matchTeam.crewcrew.entity.application.Application;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.application.ApplicationQueryRepository;
import matchTeam.crewcrew.repository.application.ApplicationRepository;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final ApplicationQueryRepository queryRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApplicationSaveResponseDTO save(ApplicationSaveRequestDTO req, Long boardId){
        User user = userRepository.findById(req.getUid()).orElseThrow(UserNotFoundException::new);
        Board board = boardRepository.findById(boardId).orElseThrow(NotExistBoardInIdException::new);

        Application application = applicationRepository.save(
                req.toEntity(req, user, board)
        );
        return ApplicationSaveResponseDTO.builder()
                .res(application).build();
    }

    @Transactional
    public ApplicationCountResponseDTO findMyApplication(Long myUid){
        ApplicationCountResponseDTO result = queryRepository.getMyApplication(myUid);
        return result;
    }

}
