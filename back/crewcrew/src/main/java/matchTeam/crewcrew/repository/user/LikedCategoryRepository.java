package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.LikedCategory;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikedCategoryRepository extends JpaRepository<LikedCategory,Long> {
    Optional<LikedCategory> findByUserAndCategory(User user, Category category);
}
