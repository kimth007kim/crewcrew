package matchTeam.crewcrew.dto.message;

import io.swagger.annotations.ApiModelProperty;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;

import java.util.List;

public class MessageRoomListResponseDTO {

    @ApiModelProperty(value = "조회 결과", dataType = "List<BoardResponseDTO>")
    private List<BoardResponseDTO> contents;

    @ApiModelProperty(value = "전체 데이터 수", dataType = "Long")
    private Long totalElements;

}
