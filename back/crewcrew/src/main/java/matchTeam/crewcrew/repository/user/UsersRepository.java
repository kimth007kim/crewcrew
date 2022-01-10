package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.user.Users;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository {
    Users findByUserId(String userId);
}
