package matchTeam.crewcrew.repository.announcement;

import matchTeam.crewcrew.entity.announcement.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}