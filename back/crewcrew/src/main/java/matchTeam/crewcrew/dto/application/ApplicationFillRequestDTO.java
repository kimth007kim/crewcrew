package matchTeam.crewcrew.dto.application;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ApplicationFillRequestDTO {

    @ApiModelProperty(value = "접속한 유저의 access token", notes = "지원을 요청한 유저의 access token")
    private String accessToken;

    @ApiModelProperty(value = "지원하기를 요청한 게시글의 id", notes = "지원하기 요청을 받은 게시글의 id")
    private Long boardId;

    @ApiModelProperty(value = "한줄소개", notes = "지원시 한줄소개")
    private String commentary;


}
