package matchTeam.crewcrew.entity.board;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import matchTeam.crewcrew.entity.user.User;

import javax.persistence.*;

@Entity
@Getter @Setter
@RequiredArgsConstructor
@Table(name = "board")
public class Board {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_seq")
    private Long boardSeq;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;
}
