package matchTeam.crewcrew.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LikedCategoryDto {
    private String email;
    private String provider;
    private List<Long> CategoryId;
}
