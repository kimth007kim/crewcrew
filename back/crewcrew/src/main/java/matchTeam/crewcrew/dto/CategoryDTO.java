package matchTeam.crewcrew.dto;

import lombok.Getter;
import matchTeam.crewcrew.entity.board.Category;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CategoryDTO {

    private Long id;
    private String categoryName;
    private List<CategoryDTO> categoryChildren;

    public CategoryDTO(final Category category) {
        this.id = category.getId();
        this.categoryName = category.getCategoryName();
        this.categoryChildren = category.getCategoryChildren().stream()
                .map(CategoryDTO::new).collect(Collectors.toList());
    }
}
