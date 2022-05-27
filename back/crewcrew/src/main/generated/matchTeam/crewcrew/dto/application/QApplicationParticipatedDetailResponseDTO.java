package matchTeam.crewcrew.dto.application;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * matchTeam.crewcrew.dto.application.QApplicationParticipatedDetailResponseDTO is a Querydsl Projection type for ApplicationParticipatedDetailResponseDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QApplicationParticipatedDetailResponseDTO extends ConstructorExpression<ApplicationParticipatedDetailResponseDTO> {

    private static final long serialVersionUID = -780315036L;

    public QApplicationParticipatedDetailResponseDTO(com.querydsl.core.types.Expression<? extends matchTeam.crewcrew.entity.board.Board> board, com.querydsl.core.types.Expression<? extends matchTeam.crewcrew.entity.application.Application> application, com.querydsl.core.types.Expression<? extends matchTeam.crewcrew.entity.user.User> user) {
        super(ApplicationParticipatedDetailResponseDTO.class, new Class<?>[]{matchTeam.crewcrew.entity.board.Board.class, matchTeam.crewcrew.entity.application.Application.class, matchTeam.crewcrew.entity.user.User.class}, board, application, user);
    }

}

