package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.LikedCategory;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByUid(Long id);
    Optional<User> findByUidAndProvider(Long uid,String provider);
    Optional<User> findByEmailAndProvider(String email, String provider);
    Optional<User> findByNickname(String Nickname);
//    @Query("select u.likedCategories from User u where  u.uid=:uid")
//    List<LikedCategory> findByUserCategory(@Param("uid") Long uid);
    @Modifying
    @Query("delete from User l where l.uid=:uid")
    void deleteUserByUid(@Param("uid")Long uid);

}
