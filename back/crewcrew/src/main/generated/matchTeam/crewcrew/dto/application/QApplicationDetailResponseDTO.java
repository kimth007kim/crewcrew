package matchTeam.crewcrew.dto.application;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * matchTeam.crewcrew.dto.application.QApplicationDetailResponseDTO is a Querydsl Projection type for ApplicationDetailResponseDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QApplicationDetailResponseDTO extends ConstructorExpression<ApplicationDetailResponseDTO> {

    private static final long serialVersionUID = -1773534838L;

    public QApplicationDetailResponseDTO(com.querydsl.core.types.Expression<? extends matchTeam.crewcrew.entity.board.Board> res, com.querydsl.core.types.Expression<? extends matchTeam.crewcrew.entity.application.Application> application) {
        super(ApplicationDetailResponseDTO.class, new Class<?>[]{matchTeam.crewcrew.entity.board.Board.class, matchTeam.crewcrew.entity.application.Application.class}, res, application);
    }

}

