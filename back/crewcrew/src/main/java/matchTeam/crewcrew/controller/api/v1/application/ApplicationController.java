package matchTeam.crewcrew.controller.api.v1.application;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.*;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.dto.board.BoardPageResponseDTO;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.announcement.AnnouncementService;
import matchTeam.crewcrew.service.application.ApplicationProgressService;
import matchTeam.crewcrew.service.application.ApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Application Controller", tags = "6. application")
@ApiOperation(value = "크루 지원, 수락, 거절 / 신청서 조회")
@RequiredArgsConstructor //생성자 주입
@RestController public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationProgressService applicationProgressService;
    private final AnnouncementService announcementService;

    @ApiOperation(value = "지원서 작성", notes = "- 유효한 uid 인지 확인합니다.\n " +
            "- 유효한 boardId 인지  확인합니다\n" +
            "- 만료된 게시판인지 확인합니다\n" +
            "- 이미 지원한 유저인지 확인합니다\n" +
            "- 작성자가 지원했는지  확인합니다\n" +
            "- 모든 조건을 만족하면, 지원을 완료합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "지원서 작성 성공",
                    response = ApplicationSaveResponseDTO.class
            ),
            @ApiResponse(
                    code = 2400,
                    message = "존재하지 않는 회원이 지원했습니다."
            ),
            @ApiResponse(
                    code = 2401,
                    message = "존재하지 않는 게시판에 지원했습니다."
            ),
            @ApiResponse(
                    code = 2402,
                    message = "만료된 게시판(날짜 혹은 인원만료)에 지원헀습니다."
            ),
            @ApiResponse(
                    code = 2403,
                    message = "중복 지원했습니다."
            ),
            @ApiResponse(
                    code = 2404,
                    message = "게시판 작성자가 지원했습니다."
            )
    })
    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping(value = "/board/application")
    public ResponseEntity<Object> fillInApplication(@ApiParam(value = "지원서 작성 요청 DTO", required = true) @RequestBody ApplicationSaveRequestDTO req) throws MessagingException{

        ApplicationSaveResponseDTO result = applicationService.save(req);
        announcementService.save(result);
        applicationProgressService.increaseApply(req.getBoardId());
        return ResponseHandler.generateResponse("지원서 작성 성공",HttpStatus.OK, result);
    }


    @ApiOperation(value = "내 지원서 조회(스터디, 취미별 지원서 개수 조회)",
            notes = "- 유효한 uid 인지 확인합니다.\n " +
                    "- 모든 조건을 만족하면, 조회를 완료합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "내 지원서 조회(스터디, 취미별 지원서 개수 조회) 성공",
                    response = ApplicationCountResponseDTO.class
            ),
            @ApiResponse(
                    code = 2400,
                    message = "존재하지 않는 회원이 조회했습니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications")
    public ResponseEntity<Object> findMyApplication(@ApiParam(value = "내 지원서(스터디, 취미별 지원서 개수 조회)를 조회하려는 uid", required = true)@RequestParam Long reqUid){
        ApplicationCountResponseDTO result = applicationService.findMyApplication(reqUid);
        return ResponseHandler.generateResponse("내 지원서 조회(스터디, 취미별 지원서 개수 조회)",HttpStatus.OK, result);
    }


    @ApiOperation(value = "내 지원서 상세보기",
            notes = "- 유효한 uid 인지 확인합니다.\n " +
                    "- 유효한 categoryParentId 인지 확인합니다.\n " +
                    "- 모든 조건을 만족하면, 조회를 완료합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "내가 지원한 크루 모집글 조회 성공",
                    response = ApplicationDetailsPageResponseDTO.class
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2405,
                    message = "부모 카테고리로 지원서 조회를 요청하지 않았습니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications/details")
    public ResponseEntity<Object> findMyApplication(@ModelAttribute ApplicationDetailSpecs detailSpecs,
                                                    @PageableDefault(size = 5)Pageable pageable){

        Page<ApplicationDetailResponseDTO> result = applicationService.findMyApplicationDetails(detailSpecs, pageable);
        ApplicationDetailsPageResponseDTO pageResponseDTO =ApplicationDetailsPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("내가 지원한 크루 모집글 카테고리별 조회 성공", HttpStatus.OK, pageResponseDTO);
    }

    @ApiOperation(value = "내게 도착한 지원서(스터디, 취미별 지원서 개수) 조회",
            notes = "- 유효한 uid 인지 확인합니다.\n " +
                    "- 모든 조건을 만족하면, 조회를 완료합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "내게 도착한 지원서(스터디, 취미별 지원서 개수) 조회 성공",
                    response = ApplicationCountResponseDTO.class
            ),
            @ApiResponse(
                    code = 2400,
                    message = "존재하지 않는 회원이 조회했습니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications/arrive")
    public ResponseEntity<Object> findArrivedApplication(@ApiParam(value = "내게 도착한 지원서(스터디, 취미별 지원서 개수) 조회를 요청한 유저 uid", required = true)@RequestParam Long reqUid){

        ApplicationCountResponseDTO result = applicationService.findArrivedApplication(reqUid);
        return ResponseHandler.generateResponse("내게 도착한 지원서 상태(카테고리 별 갯수) 조회 성공",HttpStatus.OK, result);
    }


    @ApiOperation(value = "내게 도착한 지원서 상세보기 ",
            notes = "- 유효한 uid 인지 확인합니다.\n " +
                    "- 유효한 categoryParentId 인지 확인합니다.\n " +
                    "- 모든 조건을 만족하면, 조회를 완료합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "내게 도착한 지원서 부모 카테고리 별 조회 성공",
                    response = ApplicationDetailsPageResponseDTO.class
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2405,
                    message = "부모 카테고리로 지원서 조회를 요청하지 않았습니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications/arrive/details")
    public ResponseEntity<Object> findArrivedApplicationDetails(@ModelAttribute ApplicationDetailSpecs detailSpecs,
                                                    @PageableDefault(size = 5)Pageable pageable){

        Page<ApplicationDetailResponseDTO> result = applicationService.findArrivedApplicationDetails(detailSpecs, pageable);
        ApplicationDetailsPageResponseDTO pageResponseDTO = ApplicationDetailsPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("내게 도착한 지원서 부모 카테고리 별 조회 성공", HttpStatus.OK, pageResponseDTO);
    }

    @ApiOperation(value = "내게 도착한 지원서 상세보기 ",
            notes = "- 유효한 uid 인지 확인합니다.\n " +
                    "- 유효한 boardId 인지 확인합니다.\n " +
                    "- 모든 조건을 만족하면, 조회를 완료합니다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "내게 도착한 지원서(스터디, 취미별 지원서 개수) 조회 성공",
                    response = ArrivedApplicationUserDetailsResponseDTO.class
            ),
            @ApiResponse(
                    code = 2400,
                    message = "존재하지 않는 회원이 조회했습니다."
            ),
            @ApiResponse(
                    code = 2406,
                    message = "게시판 작성자가 조회하지 않았습니다."
            ),
            @ApiResponse(
                    code = 2401,
                    message = "존재하지 않는 게시판에 지원했습니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications/arrive/details/applier")
    public ResponseEntity<Object> findArrivedApplicationApplier(@ModelAttribute ApplicationApplierSpecs specs){

        ArrivedApplicationUserDetailsResponseDTO result = applicationService.findArrivedApplicationApplier(specs);
        return ResponseHandler.generateResponse("내게 도착한 지원서의 지원자 상세 조회 성공", HttpStatus.OK, result);
    }


}
