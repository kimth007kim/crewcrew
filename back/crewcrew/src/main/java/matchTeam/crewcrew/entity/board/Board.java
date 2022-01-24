package matchTeam.crewcrew.entity.board;

import lombok.*;
import matchTeam.crewcrew.entity.User;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
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

}