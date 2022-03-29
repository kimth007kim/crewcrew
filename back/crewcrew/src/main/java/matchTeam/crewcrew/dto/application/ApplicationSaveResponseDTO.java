package matchTeam.crewcrew.dto.application;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.application.Application;

@NoArgsConstructor
@Getter
public class ApplicationSaveResponseDTO {

    @ApiModelProperty(value = "접속한 유저의 uid", notes = "지원을 요청한 유저의 uid")
    private Long uid;

    @ApiModelProperty(value = "지원하기를 요청한 게시글의 id", notes = "지원하기 요청을 받은 게시글의 id")
    private Long boardId;

    @ApiModelProperty(value = "한줄소개", notes = "지원시 한줄소개")
    private String commentary;

    @ApiModelProperty(value = "채팅방 링크", notes = "대화할 수 있느 오픈채팅방 링크")
    private String kakaoChat;

    @Builder
    public ApplicationSaveResponseDTO(Application res){
        this.uid = res.getUser().getUid();
        this.boardId = res.getBoard().getId();
        this.commentary = res.getCommentary();
        this.kakaoChat = res.getBoard().getKakaoChat();
    }
}
