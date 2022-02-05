package matchTeam.crewcrew.repository.board;

import com.querydsl.jpa.impl.JPAQueryFactory;
import matchTeam.crewcrew.entity.board.Category;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;
    
    public CategoryRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        super(Category.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

}
