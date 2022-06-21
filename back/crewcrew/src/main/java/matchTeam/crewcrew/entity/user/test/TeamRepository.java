package matchTeam.crewcrew.entity.user.test;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface TeamRepository  extends JpaRepository<Team,Long> {
}
