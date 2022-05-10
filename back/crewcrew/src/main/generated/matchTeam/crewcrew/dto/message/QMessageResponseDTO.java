package matchTeam.crewcrew.dto.message;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * matchTeam.crewcrew.dto.message.QMessageResponseDTO is a Querydsl Projection type for MessageResponseDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QMessageResponseDTO extends ConstructorExpression<MessageResponseDTO> {

    private static final long serialVersionUID = 1629585197L;

    public QMessageResponseDTO(com.querydsl.core.types.Expression<? extends matchTeam.crewcrew.entity.message.Message> res) {
        super(MessageResponseDTO.class, new Class<?>[]{matchTeam.crewcrew.entity.message.Message.class}, res);
    }

}

