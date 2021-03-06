package matchTeam.crewcrew.dto.application;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.board.Board;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
public class MyWaitingCrewResponseDTO {


    @ApiModelProperty
    private Long countCrew = 0L;

    @ApiModelProperty
    private List<ArrivedApplierDetailsDTO> content;

    @QueryProjection
    @Builder
    public MyWaitingCrewResponseDTO(Long countCrew, List<ArrivedApplierDetailsDTO> content) {
        this.countCrew = countCrew;
        this.content = content;
    }

}
