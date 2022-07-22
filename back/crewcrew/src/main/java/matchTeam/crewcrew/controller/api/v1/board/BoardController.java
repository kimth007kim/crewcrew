package matchTeam.crewcrew.controller.api.v1.board;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.*;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.board.BoardHitService;
import matchTeam.crewcrew.service.board.BoardService;
import matchTeam.crewcrew.dto.board.BoardSpecs;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "Board Controller", tags = "5. board")
@ApiOperation(value = "게시판 생성, 삭제, 수정, 조회")
@RequiredArgsConstructor //생성자 주입
@RestController
public class BoardController {

    private final BoardService boardService;
    private final BoardHitService boardHitService;
    private final UserService userService;

    @ApiOperation(value = "게시글 생성", notes = "게시글을 생성한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 작성 성공",
                    response = BoardSaveResponseDTO.class
            ),
            @ApiResponse(
                    code = 2101,
                    message = "제목이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2102,
                    message = "본문 내용이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2103,
                    message = "유효하지 않은 모임방식입니다."
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2104,
                    message = "카테고리 값이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2105,
                    message = "상세 카테고리를 고르지 않았습니다."
            ),
            @ApiResponse(
                    code = 2106,
                    message = "총모집인원이 0보다 작습니다."
            ),
            @ApiResponse(
                    code = 2107,
                    message = "집모집인원이 10명보다 큽니다."
            ),
            @ApiResponse(
                    code = 2109,
                    message = "만료날짜가 오늘날짜보다 이전이거나 오늘입니다."
            ),
            @ApiResponse(
                    code = 2110,
                    message = "요청한 유저와 응답한 결과의 유저가 다릅니다."
            ),
            @ApiResponse(
                    code = 2111,
                    message = "존재하지 않는 유저입니다."
            ),
            @ApiResponse(
                    code = 2112,
                    message = "요청한 게시판 번호와 응답한 결과의 게시판 번호가 다릅니다"
            )
    })
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/board")
    public ResponseEntity<Object> save(@RequestHeader("X-AUTH-TOKEN") String token,
                                       @ApiParam(value = "게시글 생성 요청 DTO", required = true)@RequestBody BoardSaveRequestDTO info){

        User user = userService.tokenChecker(token);
        //유효한 리퀘스트인지 확인
        boardService.checkValidSave(info);

        BoardSaveResponseDTO saveBoard = boardService.save(user, info);

        //uid가 일치하는지 확인
        boardService.checkMathchingUid(user.getUid(), saveBoard.getUid());

        return ResponseHandler.generateResponse("게시글 생성 성공", HttpStatus.OK,saveBoard);
    }

    @ApiOperation(value = "게시글 조회(번호로 조회)", notes = "게시글 번호로 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 번호로 조회 성공",
                    response = BoardResponseDTO.class
            ),
            @ApiResponse(
                    code = 2301,
                    message = "존재하지 않는 게시글 번호입니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/board/{boardId}")
    public ResponseEntity<Object> findByBoardId(@ApiParam(value = "게시글 번호", required = true)@PathVariable Long boardId,
                                                @ModelAttribute BoardSpecs boardSpecs,
                                                @PageableDefault(size = 5) Pageable pageable){

        BoardResponseDTO findBoard = boardService.findById(boardId);
        boardHitService.updateHit(boardId);

        Page<BoardPageDetailResponseDTO> page = boardService.search(boardSpecs, pageable);
        BoardPageResponseDTO pageResponseDTO = BoardPageResponseDTO.toDTO(page);

        List<Object> result = new ArrayList<>();
        result.add(findBoard);
        result.add(pageResponseDTO);

        return ResponseHandler.generateResponse("게시글 번호로 상세 조회 성공(페이징 포함)",HttpStatus.OK, result);
    }

    @ApiOperation(value = "게시글 조회(번호로 조회)", notes = "게시글 번호로 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 번호로 조회 성공",
                    response = BoardResponseDTO.class
            ),
            @ApiResponse(
                    code = 2301,
                    message = "존재하지 않는 게시글 번호입니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/board/details/{boardId}")
    public ResponseEntity<Object> findByBoardDetailsById(@ApiParam(value = "게시글 번호", required = true)@PathVariable Long boardId){

        BoardResponseDTO responseDTO = boardService.findById(boardId);
        return ResponseHandler.generateResponse("게시글 번호로 상세 조회 성공",HttpStatus.OK, responseDTO);
    }

    @ApiOperation(value = "다중 조건에 의한 게시글 리스트 조회", notes = "조건에 따라 게시글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 리스트 다중 조건 조회 성공",
                    response = BoardPageResponseDTO.class
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2301,
                    message = "올바른 정렬 조건이 아닙니다."
            )
    })
    @ApiImplicitParams({
            @ApiImplicitParam(
                    name = "approach",
                    value = "0은 오프라인, 1은 온라인 0%2C1 = [0, 1], 값 구분은 %2C"
            ),
            @ApiImplicitParam(
                    name = "categoryIds",
                    value = "상세 카테고리 아이디들, 3%2C4%2C5 = [3, 4, 5], 값 구분은 %2C"
            ),
            @ApiImplicitParam(
                    name = "keyword",
                    value = "제목+내용으로 검색할 키워드"
            ),
            @ApiImplicitParam(
                    name = "order",
                    value = "정렬 기준 키워드, recent=최신, popular=조회수, expired=만료순",
                    defaultValue = "recent"
            ),
            @ApiImplicitParam(
                    name = "page",
                    value = "페이지 번호, 0부터 시작"
            )
    })
    @GetMapping("/board/list")
    public ResponseEntity<Object> getBoardList(@ModelAttribute BoardSpecs boardSpecs,
                                               @PageableDefault(size = 10) Pageable pageable){
        Page<BoardPageDetailResponseDTO> result = boardService.search(boardSpecs, pageable);
        BoardPageResponseDTO pageResponseDTO = BoardPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("게시글 리스트 다중 조건 조회 성공", HttpStatus.OK, pageResponseDTO);
    }

    @ApiOperation(value = "게시글 수정(게시글 번호로 수정)", notes = "게시글 번호로 수정한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 번호로 수정 성공",
                    response = BoardResponseDTO.class
            ),
            @ApiResponse(
                    code = 2101,
                    message = "제목이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2102,
                    message = "본문 내용이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2103,
                    message = "유효하지 않은 모임방식입니다."
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2104,
                    message = "카테고리 값이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2105,
                    message = "상세 카테고리를 고르지 않았습니다."
            ),
            @ApiResponse(
                    code = 2106,
                    message = "총모집인원이 0보다 작습니다."
            ),
            @ApiResponse(
                    code = 2107,
                    message = "총모집인원이 10명보다 큽니다."
            ),
            @ApiResponse(
                    code = 2108,
                    message = "모집인원이 총인원보다 많습니다."
            ),
            @ApiResponse(
                    code = 2109,
                    message = "만료날짜가 오늘날짜보다 이전이거나 오늘입니다."
            ),
            @ApiResponse(
                    code = 2110,
                    message = "요청한 유저와 응답한 결과의 유저가 다릅니다."
            ),
            @ApiResponse(
                    code = 2111,
                    message = "존재하지 않는 유저입니다."
            ),
            @ApiResponse(
                    code = 2112,
                    message = "요청한 게시판 번호와 응답한 결과의 게시판 번호가 다릅니다"
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping("/board/{boardId}")
    public ResponseEntity<Object> update(@RequestHeader("X-AUTH-TOKEN") String token,
                                         @ApiParam(value = "수정을 요청하는 게시글 번호", required = true)@PathVariable Long boardId,
                                         @ApiParam(value = "게시글 수정 요청 DTO", required = true)@RequestBody BoardUpdateRequestDTO info){
        User user = userService.tokenChecker(token);
        boardService.checkValidUpdate(info);

        Long updateBoardId = boardService.update(boardId, info);
        BoardResponseDTO updateBoard = boardService.findById(updateBoardId);

        boardService.checkMathchingUid(user.getUid(), updateBoard.getUid());
        boardService.checkMathchingBoardId(boardId, updateBoard.getBoardId());
        return ResponseHandler.generateResponse("게시글 번호로 수정 성공",HttpStatus.OK, updateBoard);
    }

    @ApiOperation(value = "게시글 삭제(게시글 번호로 삭제)", notes = "게시글 번호로 삭제한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "%d번 게시글이 삭제 성공",
                    response = Long.class
            ),
            @ApiResponse(
                    code = 2301,
                    message = "존재하지 않는 게시글 번호입니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/board/{boardId}")
    public ResponseEntity<Object> delete(@ApiParam(value = "삭제를 요청하는 게시글 번호", required = true)
                                             @PathVariable Long boardId){
        boardService.delete(boardId);
        return ResponseHandler.generateResponse(boardId+"번 게시글이 삭제 성공", HttpStatus.OK, boardId);
    }

    @ApiOperation(value = "uid로 프로필페이지에서 모집중인 크루 참여중인 크루 개수 조회하기", notes = "uid로 프로필페이지에서 모집중인 크루 참여중인 크루 개수 조회한다.")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/profile/board/{uid}")
    public ResponseEntity<Object> getProfileByUid(@ApiParam(value = "유저의 uid", required = true)
                                         @PathVariable Long uid){

        BoardCountByUidResponseDTO count = boardService.findProfileByUidCount(uid);
        System.out.println("count.getAcceptedCrewCntInHobby() = " + count.getAcceptedCrewCntInHobby());
        return ResponseHandler.generateResponse("uid로 프로필페이지에서 모집중인 크루 참여중인 크루 개수 조회하기", HttpStatus.OK, count);
    }

    @ApiOperation(value = "uid로 프로필페이지에서 모집중인 크루 목록 조회하기", notes = "uid로 프로필페이지에서 모집중인 크루 참여중인 크루 개수 조회한다.")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/profile/board/recruited/{uid}")
    public ResponseEntity<Object> getRecruitedBoardByUid(@ApiParam(value = "유저의 uid", required = true) @PathVariable Long uid,
                                                         @PageableDefault(size = 5) Pageable pageable){

        Page<BoardPageDetailResponseDTO> dtos = boardService.findRecruitedBoardByUid(uid, pageable);
        BoardPageResponseDTO pageResponseDTO = BoardPageResponseDTO.toDTO(dtos);
        return ResponseHandler.generateResponse("uid로 프로필페이지에서 모집중인 크루 목록 조회하기 성공", HttpStatus.OK, pageResponseDTO);
    }

    @ApiOperation(value = "uid로 프로필페이지에서 참여중인 크루 목록 조회하기", notes = "uid로 프로필페이지에서 모집중인 크루 참여중인 크루 개수 조회한다.")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/profile/board/accepted/{uid}")
    public ResponseEntity<Object> getAcceptedBoardByUid(@ApiParam(value = "유저의 uid", required = true) @PathVariable Long uid,
                                                        @PageableDefault(size = 5) Pageable pageable){

        Page<BoardPageDetailResponseDTO> dtos = boardService.findAcceptedBoardByUid(uid, pageable);
        BoardPageResponseDTO pageResponseDTO = BoardPageResponseDTO.toDTO(dtos);
        return ResponseHandler.generateResponse("uid로 프로필페이지에서 참여중인 크루 목록 조회하기 성공", HttpStatus.OK, pageResponseDTO);
    }

}
