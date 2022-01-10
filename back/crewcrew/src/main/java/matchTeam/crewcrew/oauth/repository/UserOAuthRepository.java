package matchTeam.crewcrew.oauth.repository;

import matchTeam.crewcrew.oauth.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;
import java.util.Optional;

public interface UserOAuthRepository extends JpaRepository<Users, BigInteger> {
    Optional<Users> findByEmail(String email);
}
