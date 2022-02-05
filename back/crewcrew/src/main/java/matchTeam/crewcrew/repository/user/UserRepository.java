package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByUid(Long id);
    Optional<User> findByEmailAndProvider(String email, String provider);
}
