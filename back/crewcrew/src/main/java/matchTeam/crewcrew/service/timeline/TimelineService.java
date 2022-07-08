package matchTeam.crewcrew.service.timeline;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.board.BoardUpdateRequestDTO;
import matchTeam.crewcrew.dto.timeline.TimelinePageDetailResponseDTO;
import matchTeam.crewcrew.entity.announcement.Announcement;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.repository.announcement.AnnouncementRepository;
import matchTeam.crewcrew.repository.timeline.TimelineSearchRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TimelineService {

    private final TimelineSearchRepository timelineQueryRepository;
    private final AnnouncementRepository announcementRepository;

    @Transactional(readOnly = true)
    public Page<TimelinePageDetailResponseDTO> search(Long userId, Pageable pageable, Integer filter) {
        return timelineQueryRepository.search(userId, pageable, filter);
    }

    @Transactional
    public void delete(Long id){
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new CrewException(ErrorCode.NOT_EXIST_TIMELINE_TO_CANCEL));
        announcementRepository.delete(announcement);
    }

    @Transactional
    public Long read(Long id){
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new CrewException(ErrorCode.NOT_EXIST_TIMELINE_TO_CANCEL));

        announcement.read();
        return id;
    }
}
