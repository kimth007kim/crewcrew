package matchTeam.crewcrew.entity.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = 1709658419L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard board = new QBoard("board");

    public final NumberPath<Integer> appliedCrew = createNumber("appliedCrew", Integer.class);

    public final StringPath approach = createString("approach");

    public final StringPath boardContent = createString("boardContent");

    public final DateTimePath<java.time.Instant> createdDate = createDateTime("createdDate", java.time.Instant.class);

    public final NumberPath<Long> hit = createNumber("hit", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.Instant> modifiedDate = createDateTime("modifiedDate", java.time.Instant.class);

    public final NumberPath<Integer> recruitedCrew = createNumber("recruitedCrew", Integer.class);

    public final StringPath title = createString("title");

    public final NumberPath<Integer> totalCrew = createNumber("totalCrew", Integer.class);

    public final matchTeam.crewcrew.entity.QUser uid;

    public QBoard(String variable) {
        this(Board.class, forVariable(variable), INITS);
    }

    public QBoard(Path<? extends Board> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard(PathMetadata metadata, PathInits inits) {
        this(Board.class, metadata, inits);
    }

    public QBoard(Class<? extends Board> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.uid = inits.isInitialized("uid") ? new matchTeam.crewcrew.entity.QUser(forProperty("uid")) : null;
    }

}

