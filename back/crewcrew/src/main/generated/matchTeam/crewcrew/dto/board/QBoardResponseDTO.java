package matchTeam.crewcrew.dto.board;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * matchTeam.crewcrew.dto.board.QBoardResponseDTO is a Querydsl Projection type for BoardResponseDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QBoardResponseDTO extends ConstructorExpression<BoardResponseDTO> {

    private static final long serialVersionUID = 25519919L;

    public QBoardResponseDTO(com.querydsl.core.types.Expression<? extends matchTeam.crewcrew.entity.board.Board> res) {
        super(BoardResponseDTO.class, new Class<?>[]{matchTeam.crewcrew.entity.board.Board.class}, res);
    }

}

