package matchTeam.crewcrew.entity.chat;

import lombok.*;
import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.user.User;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@DynamicUpdate
@Entity
@Builder
public class ChatMessage  extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="roomId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ChatRoom chatRoom;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(length = 250)
    private String content;

    @Column
    private int readCnt;

    public ChatMessage toEntity(ChatRoom chatRoom,User user, String content) {
        return ChatMessage.builder()
                .chatRoom(chatRoom)
                .user(user)
                .content(content)
                .build();
    }
}
