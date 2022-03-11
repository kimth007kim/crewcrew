package matchTeam.crewcrew.entity.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCategory is a Querydsl query type for Category
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCategory extends EntityPathBase<Category> {

    private static final long serialVersionUID = 1151605649L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCategory category = new QCategory("category");

    public final StringPath categoryName = createString("categoryName");

    public final QCategory categoryParent;

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<matchTeam.crewcrew.entity.user.LikedCategory, matchTeam.crewcrew.entity.user.QLikedCategory> likedCategories = this.<matchTeam.crewcrew.entity.user.LikedCategory, matchTeam.crewcrew.entity.user.QLikedCategory>createList("likedCategories", matchTeam.crewcrew.entity.user.LikedCategory.class, matchTeam.crewcrew.entity.user.QLikedCategory.class, PathInits.DIRECT2);

    public QCategory(String variable) {
        this(Category.class, forVariable(variable), INITS);
    }

    public QCategory(Path<? extends Category> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCategory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCategory(PathMetadata metadata, PathInits inits) {
        this(Category.class, metadata, inits);
    }

    public QCategory(Class<? extends Category> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.categoryParent = inits.isInitialized("categoryParent") ? new QCategory(forProperty("categoryParent"), inits.get("categoryParent")) : null;
    }

}

