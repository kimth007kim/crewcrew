package matchTeam.crewcrew.entity.chat;

import lombok.*;
import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.entity.user.test.Member;
import org.hibernate.annotations.DynamicUpdate;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="roomId")
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mid")
    private Member member;

    @Column(length = 250)
    private String content;

    @Column
    private int readCnt;

    public ChatMessage toEntity(ChatRoom chatRoom,Member member, String content) {
        return ChatMessage.builder()
                .chatRoom(chatRoom)
                .member(member)
                .content(content)
                .build();
    }
}
