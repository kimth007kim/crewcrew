package matchTeam.crewcrew.dto.application;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * matchTeam.crewcrew.dto.application.QApplicationResponseDTO is a Querydsl Projection type for ApplicationResponseDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QApplicationResponseDTO extends ConstructorExpression<ApplicationResponseDTO> {

    private static final long serialVersionUID = 1428402267L;

    public QApplicationResponseDTO(com.querydsl.core.types.Expression<Long> categoryParentId, com.querydsl.core.types.Expression<Long> countApllication) {
        super(ApplicationResponseDTO.class, new Class<?>[]{long.class, long.class}, categoryParentId, countApllication);
    }

}

