package matchTeam.crewcrew.entity.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLikedCategory is a Querydsl query type for LikedCategory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QLikedCategory extends EntityPathBase<LikedCategory> {

    private static final long serialVersionUID = 409544115L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLikedCategory likedCategory = new QLikedCategory("likedCategory");

    public final matchTeam.crewcrew.entity.board.QCategory category;

    public final NumberPath<Long> likeId = createNumber("likeId", Long.class);

    public final QUser user;

    public QLikedCategory(String variable) {
        this(LikedCategory.class, forVariable(variable), INITS);
    }

    public QLikedCategory(Path<? extends LikedCategory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLikedCategory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLikedCategory(PathMetadata metadata, PathInits inits) {
        this(LikedCategory.class, metadata, inits);
    }

    public QLikedCategory(Class<? extends LikedCategory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new matchTeam.crewcrew.entity.board.QCategory(forProperty("category"), inits.get("category")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

