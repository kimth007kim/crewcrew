package matchTeam.crewcrew.dto.category;

import io.swagger.annotations.ApiModelProperty;
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
public class CategoryResponseDTO {

    @ApiModelProperty(value = "카테고리 id", notes = "카테고리 번호", example = "1")
    private Long categoyId;

    @ApiModelProperty(value = "카테고리 이름", notes = "상위 카테고리 제목", example = "스터디")
    private String categoryName;

    @ApiModelProperty(value = "하위 카테고리 조회", notes = "하위 카테고리를 전부 조회")
    private List<CategoryResponseDTO> children;

    public static List<CategoryResponseDTO> toDtoList(List<Category> categories) {
        NestedConvertHelper helper = NestedConvertHelper.newInstance(
                categories,
                c -> new CategoryResponseDTO(c.getId(), c.getCategoryName(), new ArrayList<>()),
                c -> c.getCategoryParent(),
                c -> c.getId(),
                d -> d.getChildren());
        return helper.convert();
    }
}
