package matchTeam.crewcrew.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import matchTeam.crewcrew.entity.board.Category;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@Getter
public class CategoryDto implements Serializable {
    private final Long id;
    private final Category categoryParent;
    private final String categoryName;
    private final List<Category> categoryChildren;
}
