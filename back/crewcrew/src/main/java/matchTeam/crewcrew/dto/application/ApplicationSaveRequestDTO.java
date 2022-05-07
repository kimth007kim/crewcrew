package matchTeam.crewcrew.dto.application;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.entity.application.Application;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;

@NoArgsConstructor
@Getter
public class ApplicationSaveRequestDTO {

    @ApiModelProperty(value = "접속한 유저의 uid", notes = "지원을 요청한 유저의 uid")
    private Long uid;

    @ApiModelProperty(value = "지원하기를 요청한 게시글의 id", notes = "지원하기 요청을 받은 게시글의 id")
    private Long boardId;

    @ApiModelProperty(value = "한줄소개", notes = "지원시 한줄소개")
    private String commentary;

    public Application toEntity(ApplicationSaveRequestDTO req,
                                User user, Board board){

        return Application.builder()
                .board(board)
                .user(user)
                .commentary(req.getCommentary()).build();

    }
}
