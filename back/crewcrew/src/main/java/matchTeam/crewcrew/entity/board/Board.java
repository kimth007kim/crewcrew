package matchTeam.crewcrew.entity.board;

import matchTeam.crewcrew.entity.User;

import javax.persistence.*;

@Entity
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_seq", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private User uid;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "board_content", length = 2000)
    private String boardContent;

    @Column(name = "recruited_crew")
    private Integer recruitedCrew;

    @Column(name = "total_crew")
    private Integer totalCrew;

    @Column(name = "url")
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getTotalCrew() {
        return totalCrew;
    }

    public void setTotalCrew(Integer totalCrew) {
        this.totalCrew = totalCrew;
    }

    public Integer getRecruitedCrew() {
        return recruitedCrew;
    }

    public void setRecruitedCrew(Integer recruitedCrew) {
        this.recruitedCrew = recruitedCrew;
    }

    public String getBoardContent() {
        return boardContent;
    }

    public void setBoardContent(String boardContent) {
        this.boardContent = boardContent;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getUid() {
        return uid;
    }

    public void setUid(User uid) {
        this.uid = uid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}