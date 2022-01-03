package matchTeam.crewcrew.repository;

import matchTeam.crewcrew.Entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String Email);
    List<User> findAll();

}
