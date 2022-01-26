package matchTeam.crewcrew.entity.board;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.User;

import javax.persistence.*;
import java.time.Instant;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "board")
@Entity
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

    @Column(name = "applied_crew")
    private Integer appliedCrew;

    @Column(name = "recruited_crew")
    private Integer recruitedCrew;

    @Column(name = "total_crew")
    private Integer totalCrew;

    @Column(name = "approach")
    private String approach;

    @Column(name = "hit")
    private Long hit;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "modified_date")
    private Instant modifiedDate;

}