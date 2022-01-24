package matchTeam.crewcrew.controller;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.BoardDTO;
import matchTeam.crewcrew.response.board.BoardSuccessResponse;
import matchTeam.crewcrew.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/board/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public BoardSuccessResponse getBoard(@PathVariable(name = "id") Long id) {
        BoardDTO board = boardService.getBoard(id);

        return BoardSuccessResponse.success(board);
    }
}
