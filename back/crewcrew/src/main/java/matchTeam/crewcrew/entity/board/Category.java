package matchTeam.crewcrew.entity.board;

import javax.persistence.*;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Long id;

    @Column(name = "category_lev")
    private Long categoryLev;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_detail_lev")
    private Long categoryDetailLev;

    @Column(name = "category_detail_name")
    private String categoryDetailName;

    @Column(name = "category_parent_lev")
    private Long categoryParentLev;

    public Long getCategoryParentLev() {
        return categoryParentLev;
    }

    public void setCategoryParentLev(Long categoryParentLev) {
        this.categoryParentLev = categoryParentLev;
    }

    public String getCategoryDetailName() {
        return categoryDetailName;
    }

    public void setCategoryDetailName(String categoryDetailName) {
        this.categoryDetailName = categoryDetailName;
    }

    public Long getCategoryDetailLev() {
        return categoryDetailLev;
    }

    public void setCategoryDetailLev(Long categoryDetailLev) {
        this.categoryDetailLev = categoryDetailLev;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getCategoryLev() {
        return categoryLev;
    }

    public void setCategoryLev(Long categoryLev) {
        this.categoryLev = categoryLev;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}