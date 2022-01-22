package matchTeam.crewcrew.dto;

import lombok.Getter;
import matchTeam.crewcrew.entity.board.Category;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CategoryResult {

    private Long categoryID;

    private String categoryName;

    private List<CategoryResult> categoryChildren;

    public CategoryResult(final Category category){
        this.categoryID = category.getId();
        this.categoryName = category.getCategoryName();
        this.categoryChildren = category.getCategoryChildren().stream()
                .map(CategoryResult:: new).collect(Collectors.toList());
    }
}
