package matchTeam.crewcrew.dto.application;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class ApplicationDetailSpecs {
    @ApiModelProperty(value = "유저의 uid", notes = "(내가 참여요청한 크루)의 조회를 요청한 유저의 uid")
    private Long uid;

    @ApiModelProperty(value = "카테고리 부모 id", notes = "(내가 참여요청한 크루)의 게시글 분류를 위한 카테고리 부모 id", example = "1")
    private Long categoryParentId;

    @Builder
    public ApplicationDetailSpecs(Long uid, Long categoryParentId) {
        this.uid = uid;
        this.categoryParentId = categoryParentId;
    }
}
