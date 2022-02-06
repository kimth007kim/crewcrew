package matchTeam.crewcrew.entity.board;

import lombok.*;
import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.user.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Positive
    @NotNull
    @Column(name = "recruited_crew", columnDefinition = "integer default 0", nullable = false)
    private Integer recruitedCrew;

    @Positive
    @NotNull
    @Column(name = "total_crew", nullable = false)
    private Integer totalCrew;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "approach", nullable = false)
    private BoardApproach approach;

    @Column(name = "hit", columnDefinition = "bigint default 0")
    private Long hit;

    @DateTimeFormat(pattern = "yyyy-mm-dd")
    @Column(name = "expired_date")
    private LocalDate expiredDate;

    /*
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
    자동으로 생성함
*/
    @Builder
    public Board(String title, String boardContent,
                 User user, Category category,
                 Integer recruitedCrew, Integer totalCrew, BoardApproach approach,
                 LocalDate expiredDate) {
        this.title = title;
        this.boardContent = boardContent;
        this.user = user;
        this.category = category;
        this.appliedCrew = 0;
        this.recruitedCrew = recruitedCrew;
        this.totalCrew = totalCrew;
        this.approach = approach;
        this.expiredDate = expiredDate;
        this.hit = 0L;
    }

//    public void update()
}