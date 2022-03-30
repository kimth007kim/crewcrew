package matchTeam.crewcrew.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    private Category category;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="uid")
    @JsonBackReference
    private User user;

    public void setUser(User user){
        this.user=user;
        System.out.println("uid"+user.getUid());
        System.out.println(" !!유저의 카테고리 리스트!! "+user.getLikedCategories());
        user.getLikedCategories().add(this);
    }

//    public void setCategory(Category cate)

    public static LikedCategory createLikedCategory(User user, Category category){
        LikedCategory likedCategory= new LikedCategory();
        likedCategory.setUser(user);
        likedCategory.setCategory(category);
        return likedCategory;
    }

}
