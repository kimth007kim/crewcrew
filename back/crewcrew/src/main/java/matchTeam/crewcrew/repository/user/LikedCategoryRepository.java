package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.user.LikedCategory;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedCategoryRepository extends JpaRepository<LikedCategory,Long> {
}
