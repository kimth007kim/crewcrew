package matchTeam.crewcrew.controller.board;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.dto.board.BoardSaveResponseDTO;
import matchTeam.crewcrew.dto.board.BoardUpdateRequestDTO;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.board.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Board Controller", tags = "board")
@ApiOperation(value = "게시판 생성, 삭제, 수정, 조회")
@RequiredArgsConstructor //생성자 주입
@RestController
public class BoardController {

    private final BoardService boardService;

    @ApiOperation(value = "게시글 생성", notes = "게시글을 생성한다.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/board", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> save(@RequestBody BoardSaveRequestDTO req){
        //모집인원이나 총인원이 0일경우
        if (req.getTotalCrew() <= 0 || req.getRecruitedCrew() <=0){
            return ResponseHandler.ErrorResponse(ErrorCode.THE_NUMBER_OF_CREW_BY_ZERO);
        }

        if (req.getTotalCrew() < req.getRecruitedCrew()){
            return ResponseHandler.ErrorResponse(ErrorCode.OVER_RECRUITED);
        }

        if (req.getCategoryId() <= 2){
            return ResponseHandler.ErrorResponse(ErrorCode.NOT_SELECT_DETAIL_CATEGORY);
        }

        BoardSaveResponseDTO saveBoard = boardService.save(req);
        return ResponseHandler.generateResponse("게시글 생성 성공", HttpStatus.OK,saveBoard);
    }

    @ApiOperation(value = "게시글 조회(번호로 조회)", notes = "게시글 번호로 조회한다.")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/board/{id}")
    public ResponseEntity<Object> findById(@PathVariable Long id){
        BoardResponseDTO findBoard = boardService.findById(id);
        return ResponseHandler.generateResponse("게시글 번호로 조회 성공",HttpStatus.OK, findBoard);
    }

    @ApiOperation(value = "게시글 수정(게시글 번호로 수정)", notes = "게시글 번호로 수정한다.")
    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping("/board/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody BoardUpdateRequestDTO req){
        //모집인원이나 총인원이 0일경우
        if (req.getTotalCrew() <= 0 || req.getRecruitedCrew() <=0){
            return ResponseHandler.ErrorResponse(ErrorCode.THE_NUMBER_OF_CREW_BY_ZERO);
        }

        if (req.getTotalCrew() < req.getRecruitedCrew()){
            return ResponseHandler.ErrorResponse(ErrorCode.OVER_RECRUITED);
        }

        if (req.getCategoryId() <= 2){
            return ResponseHandler.ErrorResponse(ErrorCode.NOT_SELECT_DETAIL_CATEGORY);
        }


        Long updateBoardId = boardService.update(id, req);
        BoardResponseDTO updateBoard = boardService.findById(updateBoardId);
        return ResponseHandler.generateResponse("게시글 번호로 수정 성공",HttpStatus.OK, updateBoard);

        /**
         * {
         *   "approachCode": 1,
         *   "boardContent": "담원 승리, 젠지 승리",
         *   "categoryId": 5,
         *   "expiredDate": "2022-02-20",
         *   "recruitedCrew": 7,
         *   "title": "0210 LCK 결과",
         *   "totalCrew": 7
         * }
         */
    }


}
