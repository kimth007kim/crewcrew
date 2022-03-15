package matchTeam.crewcrew.dto.category;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Category;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
public class EachCategoryResponseDTO {

    @ApiModelProperty(value = "상위카테고리 id", notes = "상위 카테고리 번호", example = "1")
    private Long categoryParentId;

    @ApiModelProperty(value = "하위 카테고리 id", notes = "상세 카테고리 번호", example = "3")
    private Long categoryId;

    @ApiModelProperty(value = "상위카테고리 이름", notes = "상위 카테고리 제목", example = "스터디")
    private String categoryParentName;

    @ApiModelProperty(value = "하위 카테고리 이름", notes = "상세 카테고리 제목", example = "어학(토익/토플)")
    private String categoryName;

    @ApiModelProperty(value = "카테고리 상세 설명", notes = "카테고리 상세 부가 설명", example = "(토플/토익)")
    private String description;

    @Builder
    public EachCategoryResponseDTO(Category res) {
        this.categoryParentId = res.getCategoryParent().getId();
        this.categoryId = res.getId();
        this.categoryName = res.getCategoryName();
        this.categoryParentName = res.getCategoryParent().getCategoryName();
        this.description = res.getDescription();
    }

    public static List<EachCategoryResponseDTO> toDtoList(List<Category> categories){
        List<EachCategoryResponseDTO> result = new ArrayList<>();

        for (Category category: categories) {
            result.add(EachCategoryResponseDTO.builder().res(category).build());
        }

        return result;
    }
}
