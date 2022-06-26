package matchTeam.crewcrew.entity.chat;

import lombok.*;
import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.entity.user.test.Member;
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

    private String name;

    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "publisher")
    private Member publisher;

    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "subscriber")
    private Member subscriber;

    public ChatRoom toEntity(Member publisher,Member subscriber) {
        return ChatRoom.builder()
                .publisher(publisher)
                .subscriber(subscriber)
                .build();
    }

}
