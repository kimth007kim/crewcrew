package matchTeam.crewcrew.entity.announcement;

import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.user.User;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "announcement", indexes = {
        @Index(name = "fk_announce_to_board_idx", columnList = "board_id"),
        @Index(name = "fk_announce_to_user_applicant_idx", columnList = "applicant_id"),
        @Index(name = "fk_announce_to_user_idx", columnList = "leader_id")
})
public class Announcement extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "announce_id", nullable = false)
    private Long announceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leader_id")
    private User leader;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private User applicant;

    @Column(name = "announce_type")
    private Integer announceType;


}