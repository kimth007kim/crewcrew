package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken,String> {
    Optional<ConfirmationToken> findByEmailAndExpirationDateAfterAndExpired(String confirmationTokenId, LocalDateTime now, boolean expired);
}
