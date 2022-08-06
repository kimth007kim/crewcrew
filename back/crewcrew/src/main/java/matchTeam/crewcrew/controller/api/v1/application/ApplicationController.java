package matchTeam.crewcrew.controller.api.v1.application;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.*;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.board.BoardPageResponseDTO;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.entity.application.Application;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.LikedCategory;

import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.application.ApplicationRepository;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.response.exception.CrewException;
import matchTeam.crewcrew.service.announcement.AnnouncementService;
import matchTeam.crewcrew.service.application.ApplicationProgressService;
import matchTeam.crewcrew.service.application.ApplicationService;
import matchTeam.crewcrew.service.board.BoardService;
import matchTeam.crewcrew.service.mail.TotalEmailService;
import matchTeam.crewcrew.service.user.LikedCategoryService;
import matchTeam.crewcrew.service.user.UserService;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.joining;

@Api(value = "Application Controller", tags = "6. application")
@ApiOperation(value = "크루 지원, 수락, 거절 / 신청서 조회")
@RequiredArgsConstructor //생성자 주입
@RestController public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationProgressService applicationProgressService;
    private final AnnouncementService announcementService;
    private final TotalEmailService totalEmailService;
    private final UserService userService;
    private final BoardService boardService;
    private final LikedCategoryService likedCategoryService;
    private final ApplicationRepository applicationRepository;

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
    public ResponseEntity<Object> fillInApplication(@RequestHeader("X-AUTH-TOKEN") String token,
                                                    @ApiParam(value = "지원서 작성 요청 DTO", required = true) @RequestBody ApplicationSaveRequestDTO info) throws MessagingException{
        User user = userService.tokenChecker(token);

        ApplicationSaveResponseDTO result = applicationService.save(user, info);
        announcementService.save(result);
        applicationProgressService.increaseApply(info.getBoardId());

        BoardResponseDTO board = boardService.findById(info.getBoardId());

        likedCategoryService.findUsersLike(user);

        Context context = new Context();
        user.getProfileImage();

        context.setVariable("nickname", user.getNickname());
        context.setVariable("boardTitle", board.getTitle());
        context.setVariable("commentary", info.getCommentary());
        context.setVariable("introduce", user.getIntroduce());
        context.setVariable("interestStudyCategory", likedCategoryService.findUsersStudyLike(user).stream().collect(joining(",")));
        context.setVariable("interestHobbyCategory", likedCategoryService.findUsersHobbyLike(user).stream().collect(joining(",")));
        context.setVariable("profileImageURL", user.getProfileImage());
        context.setVariable("url", "https://crewcrew.org/post/" + board.getBoardId());
        totalEmailService.sendJavaMail("[크루크루] 지원서 도착", userService.findByUid(board.getUid()).getEmail(), "mailform/apply", context);
        return ResponseHandler.generateResponse("지원서 작성 성공",HttpStatus.OK, result);
    }

    @ApiOperation(value = "지원서 진행사항 수정하기")
    @ResponseStatus(value = HttpStatus.OK )
    @PutMapping(value = "/application/status")
    public ResponseEntity<Object> updateApply(@RequestHeader("X-AUTH-TOKEN") String token, @RequestBody UpdateApplyRequestDTO request) throws Exception {

        User user = userService.tokenChecker(token);
        ApplicationUserDetailsResponseDTO result = applicationService.updateApply(request, user);
        announcementService.save(result);

        Application application = applicationService.findbyId(request.getApId());
        Board board = application.getBoard();


        if (request.getStatusCode().equals(0)){
            applicationProgressService.declinedApply(board.getId()); // 참여거절할 경우, 참여요청자수 - 1
        } else if (request.getStatusCode().equals(1)){
            applicationProgressService.increaseApply(board.getId());
        }else if (request.getStatusCode() == 2){ // 참여 수락된 경우 메일 발송
            User appliedUser = application.getUser();

            Context context = new Context();
            context.setVariable("nickname", appliedUser.getNickname());
            context.setVariable("chatURL", board.getKakaoChat());
            context.setVariable("boardTitle", board.getTitle());
            totalEmailService.sendJavaMail("[크루크루] 회원님의 요청이 수락되었습니다", appliedUser.getEmail(), "mailform/accepted", context);

            applicationProgressService.declinedApply(board.getId());
            applicationProgressService.increaseRecruited(board.getId());

        } else if (request.getStatusCode().equals(3)){
           applicationProgressService.decreaseRecruited(board.getId());

        } else if (request.getStatusCode().equals(4)) {
            applicationProgressService.decreaseRecruited(board.getId());

        } else if (request.getStatusCode().equals(5)){
            applicationProgressService.decreaseRecruited(board.getId());
        }
        return ResponseHandler.generateResponse("지원서 진행사항 수정 성공", HttpStatus.OK, result);
    }


    @ApiOperation(value = "\"내가 참여요청한 크루\" 현황 갯수 구하기 (스터디, 취미별 지원서 개수 조회)",
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
    @GetMapping(value = "/application")
    public ResponseEntity<Object> findMyApplication(@RequestHeader("X-AUTH-TOKEN") String token){

        User user = userService.tokenChecker(token);
        ApplicationCountResponseDTO result = applicationService.findMyApplication(user);

        return ResponseHandler.generateResponse("\"내가 참여요청한 크루\" 현황 갯수 구하기 (스터디, 취미별 지원서 개수 조회)",HttpStatus.OK, result);
    }


    @ApiOperation(value = "\"내가 참여요청한 크루\" 카테고리 별로 상세보기",
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
    @GetMapping(value = "/application/details/{categoryParentId}")
    public ResponseEntity<Object> findMyApplication(@RequestHeader("X-AUTH-TOKEN") String token,
                                                    @PathVariable Long categoryParentId,
                                                    @PageableDefault(size = 5)Pageable pageable){

        User user = userService.tokenChecker(token);
        Page<ApplicationDetailResponseDTO> result = applicationService.findMyApplicationDetails(user, categoryParentId, pageable);
        ApplicationDetailsPageResponseDTO pageResponseDTO =ApplicationDetailsPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("\"내가 참여요청한 크루\" 카테고리 별로 상세보기", HttpStatus.OK, pageResponseDTO);
    }

    @ApiOperation("\"내가 모집중인 크루\" 개수 조회하기(부모 카테고리별)")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/application/recruiting")
    public ResponseEntity<Object> findRecruitingCount(@RequestHeader("X-AUTH-TOKEN") String token){

        User user = userService.tokenChecker(token);
        ApplicationCountResponseDTO count = applicationService.findRecruitingCount(user);
        return ResponseHandler.generateResponse("\"내가 모집중인 크루\" 개수 조회하기(부모 카테고리별)", HttpStatus.OK, count);
    }

    @ApiOperation("\"내가 모집중인 크루\" 모집글 상세 조회하기(카테고리 별)")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/application/recruiting/{categoryParentId}")
    public ResponseEntity<Object> findRecruitingDetails(@RequestHeader("X-AUTH-TOKEN") String token,
                                                        @PathVariable Long categoryParentId,
                                                        @PageableDefault(size = 5)Pageable pageable){

        User user = userService.tokenChecker(token);
        MyRecruitingBoardPageResDTO pageResDTO = MyRecruitingBoardPageResDTO.toDTO(applicationService.findRecruitingDetails(user, categoryParentId, pageable));

        return ResponseHandler.generateResponse("\"내가 모집중인 크루\" 모집글 상세 조회하기(카테고리 별) 성공", HttpStatus.OK, pageResDTO);
    }

    @ApiOperation("\"내가 모집중인 크루\" 대기자 혹은 참여자 조회하기")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/application/recruiting/applier/{boardId}")
    public ResponseEntity<Object> findWaitingCrew(@RequestHeader("X-AUTH-TOKEN") String token,
                                                  @PathVariable Long boardId,
                                                  @RequestParam Integer statusCode){

        User user = userService.tokenChecker(token);
        MyWaitingCrewResponseDTO waitingCrew = applicationService.findWaitingCrew(user, boardId, statusCode);
        return ResponseHandler.generateResponse("\"내가 모집중인 크루\" 대기자 혹은 참여자 조회하기 성공", HttpStatus.OK, waitingCrew);
    }

    @ApiOperation("\"내가 모집중인 크루\" 마감하기")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PatchMapping(value = "/application/recruiting/{boardId}")
    public ResponseEntity<Object> findWaitingCrew(@RequestHeader("X-AUTH-TOKEN") String token,
                                                  @PathVariable Long boardId){

        User user = userService.tokenChecker(token);
        BoardResponseDTO board = boardService.closedBoard(boardId, user);

        return ResponseHandler.generateResponse("\"내가 모집중인 크루\" 마감하기 성공", HttpStatus.OK, board);
    }

    @ApiOperation("\"나의 활동 크루\" - 내가 쓴 마감글과 참여 수락한 글 개수 구하기")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/application/myCrew")
    public ResponseEntity<Object> findMyCrewCount(@RequestHeader("X-AUTH-TOKEN") String token){

        User user = userService.tokenChecker(token);
        ApplicationMyCrewResponseDTO myCrewCount = applicationService.findMyCrewCount(user);

        return ResponseHandler.generateResponse("\"나의 활동 크루\" 내가 쓴 마감글과 참여 수락한 글 개수 구하기", HttpStatus.OK, myCrewCount);
    }

    @ApiOperation("\"나의 활동 크루\" - 내가 쓴 마감글의 상세정보 구하기")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/application/myCrew/details")
    public ResponseEntity<Object> findMyCrewDetails(@RequestHeader("X-AUTH-TOKEN") String token,
                                                    @PageableDefault(size = 5)Pageable pageable){

        User user = userService.tokenChecker(token);
        Page<BoardResponseDTO> dtoPage = applicationService.findMyCrewCountDetails(user, pageable);

        return ResponseHandler.generateResponse("\"나의 활동 크루\" - 내가 쓴 마감글의 상세정보 구하기", HttpStatus.OK, dtoPage);
    }

    @ApiOperation("\"나의 활동 크루\" - 내가 쓴 마감글의 참여자 정보 구하기")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/application/myCrew/details/applier/{boardId}")
    public ResponseEntity<Object> findMyCrewApplierDetails(@RequestHeader("X-AUTH-TOKEN") String token,
                                                           @PathVariable Long boardId){

        User user = userService.tokenChecker(token);
        MyWaitingCrewResponseDTO dto = applicationService.findMyExpiredBoardApplierDetails(user, boardId);

        return ResponseHandler.generateResponse("\"나의 활동 크루\" - 내가 쓴 마감글의 참여자 정보 구하기", HttpStatus.OK, dto);
    }

    @ApiOperation("\"나의 활동 크루\" - 내가 쓴 마감글의 마감일 +7일")
    @ResponseStatus(value = HttpStatus.OK)
    @PatchMapping(value = "/application/myCrew/extend/{boardId}")
    public ResponseEntity<Object> extendExpired(@RequestHeader("X-AUTH-TOKEN") String token,
                                                @PathVariable Long boardId){

        User user = userService.tokenChecker(token);

        applicationService.checkEqualWriter(user, boardId);
        applicationService.extendExpiredDate(boardId);

        BoardResponseDTO dto = boardService.findById(boardId);

        return ResponseHandler.generateResponse("\"나의 활동 크루\" - 내가 쓴 마감글의 마감일 +7일 성공", HttpStatus.OK, dto);
    }

    @ApiOperation(value = "\"나의 활동 크루\" - 참여수락된 글 상세보기",
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
    @GetMapping(value = "/application/myCrew/participated/details")
    public ResponseEntity<Object> findParticipatedApplication(@RequestHeader("X-AUTH-TOKEN") String token,
                                                    @PageableDefault(size = 5)Pageable pageable){

        User user = userService.tokenChecker(token);
        Page<ApplicationDetailResponseDTO> result = applicationService.findParticipatedBoardDetails(user, pageable);
        ApplicationDetailsPageResponseDTO pageResponseDTO =ApplicationDetailsPageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("\"나의 활동 크루\" - 참여수락된 글 상세보기 성공", HttpStatus.OK, pageResponseDTO);
    }

    @ApiOperation("\"나의 활동 크루\" - 참여수락된 글의 다른 참여자 상세보기")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/application/myCrew/participated/applier/{boardId}")
    public ResponseEntity<Object> findParticipatedApplierDetails(@RequestHeader("X-AUTH-TOKEN") String token,
                                                           @PathVariable Long boardId){

        User user = userService.tokenChecker(token);
        MyWaitingCrewResponseDTO dto = applicationService.findParticipatedApplierDetails(user, boardId);
        return ResponseHandler.generateResponse("\"나의 활동 크루\" - 참여수락된 글의 다른 참여자 상세보기 성공", HttpStatus.OK, dto);
    }

    @ApiOperation(value = "신청서 삭제(신청서 번호로 삭제)", notes = "신청서 번호로 삭제한다.")
    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/application/{apId}")
    public ResponseEntity<Object> delete(@ApiParam(value = "삭제를 요청하는 게시글 번호", required = true)
                                         @PathVariable Long apId){
        applicationService.delete(apId);
        return ResponseHandler.generateResponse(apId+"번 신청서 삭제 성공", HttpStatus.OK, apId);
    }
}
