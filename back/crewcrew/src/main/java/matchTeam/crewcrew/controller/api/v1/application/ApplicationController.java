package matchTeam.crewcrew.controller.api.v1.application;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.ApplicationCountResponseDTO;
import matchTeam.crewcrew.dto.application.ApplicationSaveRequestDTO;
import matchTeam.crewcrew.dto.application.ApplicationSaveResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.announcement.AnnouncementService;
import matchTeam.crewcrew.service.application.ApplicationProgressService;
import matchTeam.crewcrew.service.application.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Application Controller", tags = "6. application")
@ApiOperation(value = "스터디 지원, 수락, 거절")
@RequiredArgsConstructor //생성자 주입
@RestController public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationProgressService applicationProgressService;
    private final AnnouncementService announcementService;

    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping(value = "/board/{boardId}/application")
    public ResponseEntity<Object> fillInApplication(@ApiParam(value = "지원서를 작성하는려는 게시판 번호", required = true)
                                                    @PathVariable Long boardId,
                                                    @ApiParam(value = "지원서 작성 요청 DTO", required = true)@RequestBody ApplicationSaveRequestDTO req){

        ApplicationSaveResponseDTO result = applicationService.save(req, boardId);
        announcementService.save(result);
        applicationProgressService.increaseApply(boardId);
        return ResponseHandler.generateResponse("지원서 작성 성공",HttpStatus.OK, result);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/mypage/myApplication")
    public ResponseEntity<Object> findMyApplication(@ApiParam(value = "내가 참여요청한 지원서를 찾으려는 유저 uid", required = true)@RequestParam Long myUid){
        ApplicationCountResponseDTO result = applicationService.findMyApplication(myUid);
        return ResponseHandler.generateResponse("내가 참여요청한 지원서 갯수 세기 요청 성공",HttpStatus.OK, result);
    }

}
