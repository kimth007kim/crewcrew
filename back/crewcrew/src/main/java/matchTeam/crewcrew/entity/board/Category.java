package matchTeam.crewcrew.entity.board;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_parent_id")
    private Category categoryParent;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(mappedBy = "categoryParent")
    private List<Category> categoryChildren = new ArrayList<>();
}