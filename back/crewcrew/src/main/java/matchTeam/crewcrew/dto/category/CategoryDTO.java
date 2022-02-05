package matchTeam.crewcrew.dto.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.util.helper.NestedConvertHelper;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoryDTO {
    private Long id;
    private String categoryName;
    private List<CategoryDTO> children;

    public static List<CategoryDTO> toDtoList(List<Category> categories) {
        NestedConvertHelper helper = NestedConvertHelper.newInstance(
                categories,
                c -> new CategoryDTO(c.getId(), c.getCategoryName(), new ArrayList<>()),
                c -> c.getCategoryParent(),
                c -> c.getId(),
                d -> d.getChildren());
        return helper.convert();
    }
}
