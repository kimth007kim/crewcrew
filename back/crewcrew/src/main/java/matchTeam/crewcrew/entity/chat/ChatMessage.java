package matchTeam.crewcrew.entity.chat;

import matchTeam.crewcrew.entity.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="roomId")
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private User user;

    @Column
    private String content;

    @Column
    private LocalDateTime time;

    @Column
    private int readCnt;

}
