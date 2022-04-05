package matchTeam.crewcrew.entity.application;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QApplication is a Querydsl query type for Application
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QApplication extends EntityPathBase<Application> {

    private static final long serialVersionUID = -950262393L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QApplication application = new QApplication("application");

    public final matchTeam.crewcrew.entity.QBaseTimeEntity _super = new matchTeam.crewcrew.entity.QBaseTimeEntity(this);

    public final matchTeam.crewcrew.entity.board.QBoard board;

    public final StringPath commentary = createString("commentary");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Integer> progress = createNumber("progress", Integer.class);

    public final matchTeam.crewcrew.entity.user.QUser user;

    public QApplication(String variable) {
        this(Application.class, forVariable(variable), INITS);
    }

    public QApplication(Path<? extends Application> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QApplication(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QApplication(PathMetadata metadata, PathInits inits) {
        this(Application.class, metadata, inits);
    }

    public QApplication(Class<? extends Application> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new matchTeam.crewcrew.entity.board.QBoard(forProperty("board"), inits.get("board")) : null;
        this.user = inits.isInitialized("user") ? new matchTeam.crewcrew.entity.user.QUser(forProperty("user")) : null;
    }

}

