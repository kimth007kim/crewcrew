package matchTeam.crewcrew.dto.user.example;

import lombok.Getter;
import matchTeam.crewcrew.entity.user.User;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class UserLoginResponseDto {
    private final Long uid;
    private final List<String> roles;
    private final LocalDateTime createdDate;

    public UserLoginResponseDto(User user) {
        this.uid = user.getUid();
        this.roles = user.getRoles();
        this.createdDate = user.getCreatedDate();
    }


}
