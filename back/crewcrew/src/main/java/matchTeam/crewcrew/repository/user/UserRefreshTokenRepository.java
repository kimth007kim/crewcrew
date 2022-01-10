package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.user.UserRefreshToken;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRefreshTokenRepository {
    UserRefreshToken findByUserId(String userId);
    UserRefreshToken findByUserIdAndRefreshToken(String userId, String refreshToken);
}
