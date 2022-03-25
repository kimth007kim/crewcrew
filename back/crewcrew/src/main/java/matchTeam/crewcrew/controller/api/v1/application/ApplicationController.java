package matchTeam.crewcrew.controller.api.v1.application;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.ApplicationFillRequestDTO;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.security.RefreshTokenJpaRepository;
import matchTeam.crewcrew.response.ResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Api(value = "Application Controller", tags = "6. application")
@ApiOperation(value = "스터디 지원, 수락, 거절")
@RequiredArgsConstructor //생성자 주입
@RestController public class ApplicationController {

    private final RefreshTokenJpaRepository refreshTokenJpaRepository;

    @ResponseStatus(value = HttpStatus.CREATED)
    @GetMapping(value = "/board/{boardId}/application")
    public ResponseEntity<Object> fillInApplication(@ApiParam(value = "지원서를 작성하는려는 게시판 번호", required = true)
                                                    @PathVariable Long boardId,
                                                    @ApiParam(value = "지원서 작성시 필요한 양식", required = true)
                                                    @RequestBody ApplicationFillRequestDTO req){

        return ResponseHandler.generateResponse("지원서 작성 성공",HttpStatus.OK, req);
    }

}
