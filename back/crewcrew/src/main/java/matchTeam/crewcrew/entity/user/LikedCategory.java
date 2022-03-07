package matchTeam.crewcrew.entity.user;

import lombok.Getter;
import lombok.Setter;
import matchTeam.crewcrew.entity.board.Category;

import javax.persistence.*;

@Entity
@Getter @Setter
public class LikedCategory {

    @Id @GeneratedValue
    private Long likeId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Category category;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="uid")
    private User user;
}
