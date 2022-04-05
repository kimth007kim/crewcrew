package matchTeam.crewcrew.dto.board;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
