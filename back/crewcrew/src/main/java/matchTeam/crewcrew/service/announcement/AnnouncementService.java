package matchTeam.crewcrew.service.announcement;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.repository.announcement.AnnouncementRepository;
import matchTeam.crewcrew.dto.application.ApplicationSaveResponseDTO;
import matchTeam.crewcrew.entity.announcement.Announcement;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional
    public void save(ApplicationSaveResponseDTO req){
        User applicant = userRepository.findByUid(req.getUid());
        Board board = boardRepository.findById(req.getBoardId()).orElseThrow(NotExistBoardInIdException::new);
        User leader = board.getUser();

        Announcement announcement = announcementRepository.save(
                Announcement.builder().applicant(applicant)
                        .leader(leader)
                        .board(board).build()
        );
    }
}
