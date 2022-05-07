package matchTeam.crewcrew.controller.api.v1.application;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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

    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping(value = "/board/application")
    public ResponseEntity<Object> fillInApplication(@ApiParam(value = "지원서 작성 요청 DTO", required = true)@RequestBody ApplicationSaveRequestDTO req) throws MessagingException {

        ApplicationSaveResponseDTO result = applicationService.save(req);
        announcementService.save(result);
        applicationProgressService.increaseApply(req.getBoardId());
        return ResponseHandler.generateResponse("지원서 작성 성공",HttpStatus.OK, result);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications")
    public ResponseEntity<Object> findMyApplication(@ApiParam(value = "내가 참여요청한 지원서를 찾으려는 유저 uid", required = true)@RequestParam Long reqUid){
        ApplicationCountResponseDTO result = applicationService.findMyApplication(reqUid);
        return ResponseHandler.generateResponse("내가 참여요청한 지원서 상태(카테고리 별 갯수) 조회 성공",HttpStatus.OK, result);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications/details")
    public ResponseEntity<Object> findMyApplication(@ModelAttribute ApplicationDetailSpecs detailSpecs,
                                                    @PageableDefault(size = 5)Pageable pageable){

        Page<ApplicationDetailResponseDTO> result = applicationService.findMyApplicationDetails(detailSpecs, pageable);
        ApplicationDetailsPageResponseDTO pageResponseDTO =ApplicationDetailsPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("내가 참여요청한 지원서 부모 카테고리 별로 보기 조회 성공", HttpStatus.OK, pageResponseDTO);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications/arrive")
    public ResponseEntity<Object> findArrivedApplication(@ApiParam(value = "내게 도착한 지원서를 찾으려는 유저 uid", required = true)@RequestParam Long reqUid){

        ApplicationCountResponseDTO result = applicationService.findArrivedApplication(reqUid);
        return ResponseHandler.generateResponse("내게 도착한 지원서 상태(카테고리 별 갯수) 조회 성공",HttpStatus.OK, result);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications/arrive/details")
    public ResponseEntity<Object> findArrivedApplicationDetails(@ModelAttribute ApplicationDetailSpecs detailSpecs,
                                                    @PageableDefault(size = 5)Pageable pageable){

        Page<ApplicationDetailResponseDTO> result = applicationService.findArrivedApplicationDetails(detailSpecs, pageable);
        ApplicationDetailsPageResponseDTO pageResponseDTO = ApplicationDetailsPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("내게 도착한 지원서 부모 카테고리 별 조회 성공", HttpStatus.OK, pageResponseDTO);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/status/applications/arrive/details/applier")
    public ResponseEntity<Object> findArrivedApplicationApplier(@ModelAttribute ApplicationApplierSpecs specs){

        ArrivedApplicationUserDetailsResponseDTO result = applicationService.findArrivedApplicationApplier(specs);
        return ResponseHandler.generateResponse("내게 도착한 지원서의 지원자 상세 조회 성공", HttpStatus.OK, result);
    }


}
