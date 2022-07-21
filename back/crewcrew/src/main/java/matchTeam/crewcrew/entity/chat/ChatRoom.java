package matchTeam.crewcrew.entity.chat;

import lombok.*;
import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.user.User;
import net.bytebuddy.implementation.bind.annotation.Default;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Collections;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ChatRoom  extends BaseTimeEntity {
    @Id @GeneratedValue(generator = "uuid2")
    @Column(name="roomId",columnDefinition = "BINARY(16)")
    
    private UUID roomId;


    @ManyToOne
    @JoinColumn(name="board_seq")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "publisherId")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private User publisher;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "subscriberId")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private User subscriber;

    private int publisherIn;

    private int subscriberIn;

    public ChatRoom toEntity(User publisher,User subscriber,Board board,int publisherIn, int subscriberIn) {
        return ChatRoom.builder()
                .publisher(publisher)
                .subscriber(subscriber)
                .board(board)
                .publisherIn(publisherIn)
                .subscriberIn(subscriberIn)
                .build();
    }

}
