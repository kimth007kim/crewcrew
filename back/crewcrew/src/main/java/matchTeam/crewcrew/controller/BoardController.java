package matchTeam.crewcrew.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.response.board.BoardFailure;
import matchTeam.crewcrew.response.board.BoardResponse;
import matchTeam.crewcrew.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@Api(value = "Board Controller", tags = "board")
@ApiOperation(value = "게시판 생성, 삭제, 수정, 조회")
@RequiredArgsConstructor //생성자 주입
@RestController
public class BoardController {

    private final BoardService boardService;

    @ApiOperation(value = "게시글 생성", notes = "게시글을 생성한다.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/boardwrite", consumes = MediaType.APPLICATION_JSON_VALUE)
    public BoardResponse save(@RequestBody BoardSaveRequestDTO req){

        // 모집인원 > 총 인원수
        if (req.getRecruitedCrew() > req.getTotalCrew()){
            return BoardResponse.failure(400, "Bad Request");
        }

        //세부 카테고리 지정안했을때
        if (req.getCategoryId() <=2){
            return BoardResponse.failure(400, "Bad Request");
        }

        return BoardResponse.success(boardService.save(req));


    }

}
