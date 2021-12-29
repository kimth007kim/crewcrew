package matchTeam.crewcrew.repository;

import matchTeam.crewcrew.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface userRepository {
    User save(User user);

    Optional<User> findById(Long id);
    Optional<User> findByEmail(String Email);
    List<User> findAll();

}
