package matchTeam.crewcrew.entity.board;

import lombok.*;
import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.user.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "board")
@Entity
public class Board extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_seq", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @NotBlank
    @Column(name = "title", length = 50, nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;

    @Lob
    @NotBlank
    @Column(name = "board_content", length = 2000, nullable = false)
    private String boardContent;

    @Column(name = "applied_crew")
    private Integer appliedCrew;
    
    @Column(name = "recruited_crew", columnDefinition = "integer default 0")
    private Integer recruitedCrew;

    @Positive
    @NotNull
    @Column(name = "total_crew", nullable = false)
    private Integer totalCrew;

    @NotNull
    @Column(name = "approach", nullable = false)
    private Integer approach;

    @Column(name = "hit", columnDefinition = "bigint default 0")
    private Long hit;

    @DateTimeFormat(pattern = "yyyy-mm-dd")
    @Column(name = "expired_date")
    private LocalDate expiredDate;

    @Column
    private Boolean viewable;

    /*
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
    자동으로 생성함
*/
    @Builder
    public Board(String title, String boardContent,
                 User user, Category category, Integer totalCrew, Integer approach,
                 LocalDate expiredDate) {
        this.title = title;
        this.boardContent = boardContent;
        this.user = user;
        this.category = category;
        this.appliedCrew = 0;
        this.recruitedCrew = 0;
        this.totalCrew = totalCrew;
        this.approach = approach;
        this.expiredDate = expiredDate;
        this.hit = 0L;
        this.viewable = true;
    }

    public void update(String title, String boardContent,
                       Integer recruitedCrew, Integer totalCrew, Integer approachCode, Category category,
                       LocalDate expiredDate, Boolean viewable){
        this.title = title;
        this.boardContent = boardContent;
        this.recruitedCrew = recruitedCrew;
        this.totalCrew = totalCrew;
        this.approach = approachCode;
        this.category = category;
        this.expiredDate = expiredDate;
        this.viewable = viewable;
    }
}