package matchTeam.crewcrew.repository.security;

import matchTeam.crewcrew.entity.security.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RefreshTokenJpaRepository extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByPkey(Long pkey);
}
