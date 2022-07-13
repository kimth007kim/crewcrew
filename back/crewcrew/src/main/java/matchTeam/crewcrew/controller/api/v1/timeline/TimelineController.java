package matchTeam.crewcrew.controller.api.v1.timeline;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.timeline.TimelinePageDetailResponseDTO;
import matchTeam.crewcrew.dto.timeline.TimelinePageResponseDTO;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.service.timeline.TimelineService;
import matchTeam.crewcrew.service.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Timeline Controller", tags = "11. timeline")
@RequiredArgsConstructor
@RestController
public class TimelineController {

    private final UserService userService;
    private final TimelineService timelineService;

    @ApiOperation(value = "타임라인 리스트 조회", notes = "filter는 전체 0, 나에게 온 참여요청 1, 나의 참여요청 거절 2, 나의 참여요청 수락 3, 나의 참여 취소 4 옵션 중 하나 선택")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/timeline/list")
    public ResponseEntity<Object> getTimelineList(@RequestHeader("X-AUTH-TOKEN") String token, @PageableDefault(size = 5) Pageable pageable, @ApiParam(value = "타임라인 필터", required = true)
    @RequestParam Integer filter){
        User user = userService.tokenChecker(token);
        if (user == null) throw new CrewException(ErrorCode.NOT_EXIST_LOGINED_USER);
        Page<TimelinePageDetailResponseDTO> result = timelineService.search(user.getUid(), pageable, filter);
        TimelinePageResponseDTO pageResponseDTO = TimelinePageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("타임라인 리스트 조회 성공", HttpStatus.OK, pageResponseDTO);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/timeline/{announcementId}")
    public ResponseEntity<Object> delete(@RequestHeader("X-AUTH-TOKEN") String token, @ApiParam(value = "삭제를 요청하는 타임라인 번호", required = true)
                                         @PathVariable Long announcementId){
        User user = userService.tokenChecker(token);
        if (user == null) throw new CrewException(ErrorCode.NOT_EXIST_LOGINED_USER);
        timelineService.delete(announcementId);
        return ResponseHandler.generateResponse(announcementId+"번 타임라인 삭제 성공", HttpStatus.OK, announcementId);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping("/timeline/{announcementId}")
    public ResponseEntity<Object> read(@RequestHeader("X-AUTH-TOKEN") String token, @ApiParam(value = "읽음 처리할 타임라인 번호", required = true)
    @PathVariable Long announcementId){
        User user = userService.tokenChecker(token);
        if (user == null) throw new CrewException(ErrorCode.NOT_EXIST_LOGINED_USER);
        timelineService.read(announcementId);
        return ResponseHandler.generateResponse(announcementId+"번 타임라인 읽음 처리 성공", HttpStatus.OK, announcementId);
    }
}
