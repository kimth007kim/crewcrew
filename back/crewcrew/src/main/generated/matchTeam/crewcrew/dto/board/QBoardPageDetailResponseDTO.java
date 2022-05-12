package matchTeam.crewcrew.dto.board;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * matchTeam.crewcrew.dto.board.QBoardPageDetailResponseDTO is a Querydsl Projection type for BoardPageDetailResponseDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QBoardPageDetailResponseDTO extends ConstructorExpression<BoardPageDetailResponseDTO> {

    private static final long serialVersionUID = -1820654065L;

    public QBoardPageDetailResponseDTO(com.querydsl.core.types.Expression<? extends matchTeam.crewcrew.entity.board.Board> res, com.querydsl.core.types.Expression<Boolean> isBookmarked) {
        super(BoardPageDetailResponseDTO.class, new Class<?>[]{matchTeam.crewcrew.entity.board.Board.class, boolean.class}, res, isBookmarked);
    }

}

