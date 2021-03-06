package matchTeam.crewcrew.entity.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1786341603L;

    public static final QUser user = new QUser("user");

    public final matchTeam.crewcrew.entity.QBaseTimeEntity _super = new matchTeam.crewcrew.entity.QBaseTimeEntity(this);

    public final ListPath<matchTeam.crewcrew.entity.board.Board, matchTeam.crewcrew.entity.board.QBoard> board = this.<matchTeam.crewcrew.entity.board.Board, matchTeam.crewcrew.entity.board.QBoard>createList("board", matchTeam.crewcrew.entity.board.Board.class, matchTeam.crewcrew.entity.board.QBoard.class, PathInits.DIRECT2);

    public final ListPath<matchTeam.crewcrew.entity.bookmark.Bookmark, matchTeam.crewcrew.entity.bookmark.QBookmark> bookmarks = this.<matchTeam.crewcrew.entity.bookmark.Bookmark, matchTeam.crewcrew.entity.bookmark.QBookmark>createList("bookmarks", matchTeam.crewcrew.entity.bookmark.Bookmark.class, matchTeam.crewcrew.entity.bookmark.QBookmark.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath email = createString("email");

    public final StringPath introduce = createString("introduce");

    public final ListPath<LikedCategory, QLikedCategory> likedCategories = this.<LikedCategory, QLikedCategory>createList("likedCategories", LikedCategory.class, QLikedCategory.class, PathInits.DIRECT2);

    public final StringPath message = createString("message");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath profileImage = createString("profileImage");

    public final StringPath provider = createString("provider");

    public final ListPath<String, StringPath> roles = this.<String, StringPath>createList("roles", String.class, StringPath.class, PathInits.DIRECT2);

    public final NumberPath<Long> uid = createNumber("uid", Long.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

