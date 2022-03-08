package matchTeam.crewcrew.specification;

import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import matchTeam.crewcrew.entity.board.Category;

import java.util.ArrayList;
import java.util.List;



@NoArgsConstructor
@Getter
@Setter
public class BoardSpecs {

    private List<Integer> approach;
    private List<Long> categoryIds;
    private String keyword;
    private String order;
// 351, 429, 572
}
