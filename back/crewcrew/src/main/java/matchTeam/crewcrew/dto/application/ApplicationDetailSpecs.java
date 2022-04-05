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
    @ApiModelProperty(value = "유저의 uid", notes = "내가 참여요청한 크루 보기를 요청한 유저의 uid")
    private Long uid;

    @ApiModelProperty(value = "카테고리 부모 id", notes = "내가 참여요청한 크루 보기를 요청한 카테고리 부모 id")
    private Long categoryParentId;

    @Builder
    public ApplicationDetailSpecs(Long uid, Long categoryParentId) {
        this.uid = uid;
        this.categoryParentId = categoryParentId;
    }
}
