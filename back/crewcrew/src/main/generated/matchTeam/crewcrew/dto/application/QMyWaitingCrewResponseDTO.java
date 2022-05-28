package matchTeam.crewcrew.dto.application;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * matchTeam.crewcrew.dto.application.QMyWaitingCrewResponseDTO is a Querydsl Projection type for MyWaitingCrewResponseDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QMyWaitingCrewResponseDTO extends ConstructorExpression<MyWaitingCrewResponseDTO> {

    private static final long serialVersionUID = -2123186391L;

    public QMyWaitingCrewResponseDTO(com.querydsl.core.types.Expression<Long> waitingCrew, com.querydsl.core.types.Expression<? extends java.util.List<ArrivedApplierDetailsDTO>> content) {
        super(MyWaitingCrewResponseDTO.class, new Class<?>[]{long.class, java.util.List.class}, waitingCrew, content);
    }

}

