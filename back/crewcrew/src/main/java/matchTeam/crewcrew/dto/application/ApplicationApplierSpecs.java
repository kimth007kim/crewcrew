package matchTeam.crewcrew.dto.application;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class ApplicationApplierSpecs {
    @ApiModelProperty(value = "유저의 uid", notes = "(내게 도착한 참여요청)을 조회하려는 유저의 uid", required = true)
    private Long uid;

    @ApiModelProperty(value = "게시판 번호 id", notes = "(내게 도착한 참여요청)의 참여요청자 상세보기를 조회하려는 게시판 번호 id", required = true)
    private Long boardId;

    @Builder
    public ApplicationApplierSpecs(Long uid, Long boardId) {
        this.uid = uid;
        this.boardId = boardId;
    }
}
