package matchTeam.crewcrew.repository.user.oauth;

import matchTeam.crewcrew.Entity.oauth.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;
import java.util.Optional;

public interface UserOAuthRepository extends JpaRepository<Users, BigInteger> {
    Optional<Users> findByEmail(String email);
}
