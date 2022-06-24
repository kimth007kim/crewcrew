package matchTeam.crewcrew.entity.chat;

import lombok.*;
import matchTeam.crewcrew.entity.user.User;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ChatRoom {
    @Id @GeneratedValue(generator = "uuid2")
    @Column(name="roomId")
    
    private UUID roomId;

//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name = "publisher")
//    private User publisher;

//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name = "subscriber")
//    private User subscriber;



}
