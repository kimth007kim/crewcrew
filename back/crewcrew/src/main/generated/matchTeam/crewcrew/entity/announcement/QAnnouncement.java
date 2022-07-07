package matchTeam.crewcrew.entity.announcement;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAnnouncement is a Querydsl query type for Announcement
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAnnouncement extends EntityPathBase<Announcement> {

    private static final long serialVersionUID = 988648803L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAnnouncement announcement = new QAnnouncement("announcement");

    public final matchTeam.crewcrew.entity.QBaseTimeEntity _super = new matchTeam.crewcrew.entity.QBaseTimeEntity(this);

    public final NumberPath<Long> announceId = createNumber("announceId", Long.class);

    public final NumberPath<Integer> announceType = createNumber("announceType", Integer.class);

    public final matchTeam.crewcrew.entity.user.QUser applicant;

    public final matchTeam.crewcrew.entity.board.QBoard board;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final matchTeam.crewcrew.entity.user.QUser leader;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final BooleanPath readChk = createBoolean("readChk");

    public QAnnouncement(String variable) {
        this(Announcement.class, forVariable(variable), INITS);
    }

    public QAnnouncement(Path<? extends Announcement> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAnnouncement(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAnnouncement(PathMetadata metadata, PathInits inits) {
        this(Announcement.class, metadata, inits);
    }

    public QAnnouncement(Class<? extends Announcement> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.applicant = inits.isInitialized("applicant") ? new matchTeam.crewcrew.entity.user.QUser(forProperty("applicant")) : null;
        this.board = inits.isInitialized("board") ? new matchTeam.crewcrew.entity.board.QBoard(forProperty("board"), inits.get("board")) : null;
        this.leader = inits.isInitialized("leader") ? new matchTeam.crewcrew.entity.user.QUser(forProperty("leader")) : null;
    }

}

