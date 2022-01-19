package matchTeam.crewcrew.entity.board;

import javax.persistence.*;

@Entity
@Table(name = "board_category")
public class BoardCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bca_id", nullable = false)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq", nullable = false)
    private Board boardSeq;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Board getBoardSeq() {
        return boardSeq;
    }

    public void setBoardSeq(Board boardSeq) {
        this.boardSeq = boardSeq;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}