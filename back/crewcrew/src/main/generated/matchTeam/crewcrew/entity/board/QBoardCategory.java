package matchTeam.crewcrew.entity.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoardCategory is a Querydsl query type for BoardCategory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoardCategory extends EntityPathBase<BoardCategory> {

    private static final long serialVersionUID = -964325551L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoardCategory boardCategory = new QBoardCategory("boardCategory");

    public final QBoard boardSeq;

    public final QCategory category;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QBoardCategory(String variable) {
        this(BoardCategory.class, forVariable(variable), INITS);
    }

    public QBoardCategory(Path<? extends BoardCategory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoardCategory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoardCategory(PathMetadata metadata, PathInits inits) {
        this(BoardCategory.class, metadata, inits);
    }

    public QBoardCategory(Class<? extends BoardCategory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.boardSeq = inits.isInitialized("boardSeq") ? new QBoard(forProperty("boardSeq"), inits.get("boardSeq")) : null;
        this.category = inits.isInitialized("category") ? new QCategory(forProperty("category"), inits.get("category")) : null;
    }

}

