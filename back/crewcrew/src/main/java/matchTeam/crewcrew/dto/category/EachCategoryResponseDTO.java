package matchTeam.crewcrew.dto.category;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Category;

@NoArgsConstructor
@Getter
public class EachCategoryResponseDTO {
    private Long categoryParentId;
    private String categoryParentName;
    private Long categoryId;
    private String categoryName;

    @Builder
    public EachCategoryResponseDTO(Category res) {
        this.categoryParentId = res.getCategoryParent().getId();
        this.categoryId = res.getId();
        this.categoryName = res.getCategoryName();
    }
}
