package matchTeam.crewcrew.repository.board;

import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {


    @Query("select c from category c left join c.categoryParent p order by p.id asc nulls first, c.id asc")
    List<Category> findAllOrderByParentIdAscNullsFirstCategoryIdAsc();

    @Query("select c from category c where c.categoryParent.id = ?1")
    List<Category> findAllByCategoryParentId(Long parentId);

}