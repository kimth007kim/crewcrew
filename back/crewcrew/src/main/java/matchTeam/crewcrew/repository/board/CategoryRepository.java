package matchTeam.crewcrew.repository.board;

import matchTeam.crewcrew.entity.board.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByCategoryParentIsNull();

    List<Category> findByCategoryParent(Long parentId);

}