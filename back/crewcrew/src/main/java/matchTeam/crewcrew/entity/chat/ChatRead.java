package matchTeam.crewcrew.entity.chat;

import matchTeam.crewcrew.entity.user.User;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class ChatRead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long readId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="roomId")
    private ChatRoom room;

    @Column
    private Long cnt;
}
