package matchTeam.crewcrew.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LikedCategoryDto {
    String email;
    String provider;
    List<Long> categoryId;

}
