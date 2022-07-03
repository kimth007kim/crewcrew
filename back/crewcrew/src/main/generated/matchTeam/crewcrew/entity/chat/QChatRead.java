package matchTeam.crewcrew.entity.chat;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatRead is a Querydsl query type for ChatRead
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QChatRead extends EntityPathBase<ChatRead> {

    private static final long serialVersionUID = 752987449L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatRead chatRead = new QChatRead("chatRead");

    public final NumberPath<Long> cnt = createNumber("cnt", Long.class);

    public final NumberPath<Long> readId = createNumber("readId", Long.class);

    public final QChatRoom room;

    public final matchTeam.crewcrew.entity.user.QUser user;

    public QChatRead(String variable) {
        this(ChatRead.class, forVariable(variable), INITS);
    }

    public QChatRead(Path<? extends ChatRead> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatRead(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatRead(PathMetadata metadata, PathInits inits) {
        this(ChatRead.class, metadata, inits);
    }

    public QChatRead(Class<? extends ChatRead> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.room = inits.isInitialized("room") ? new QChatRoom(forProperty("room"), inits.get("room")) : null;
        this.user = inits.isInitialized("user") ? new matchTeam.crewcrew.entity.user.QUser(forProperty("user")) : null;
    }

}

