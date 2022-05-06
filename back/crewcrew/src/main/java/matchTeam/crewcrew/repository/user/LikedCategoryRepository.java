package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.LikedCategory;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikedCategoryRepository extends JpaRepository<LikedCategory,Long> {
    Optional<LikedCategory> findByUserAndCategory(User user, Category category);


//    @Query("select l.category from LikedCategory l where  l.user= :user")
//    List<Category> findByUser(@Param("user") User user);


    @Query("select l.category.id from LikedCategory  l where l.user = :user")
    List<Long> findByUser(@Param("user") User user);
    @Modifying
    @Query("delete from LikedCategory l where l.category=:category and l.user=:user")
    void deleteLikedCategoryByUserAndCategory(@Param("category")Category category,@Param("user") User user);


}
