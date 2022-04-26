package matchTeam.crewcrew.entity.message;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.message.MessageResponseDTO;
import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "message")
@Entity
public class Message extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private Long messageID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "send_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User sendUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recv_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User recvUser;

    @Column(name = "room_id")
    private Long roomID;

    @DateTimeFormat(pattern = "yyyy-mm-dd HH:mm:ss")
    @Column(name = "send_time")
    private LocalDateTime sendTime;

    @DateTimeFormat(pattern = "yyyy-mm-dd HH:mm:ss")
    @Column(name = "read_time")
    private LocalDateTime readTime;

    @NotBlank
    @Column(name = "message_content", length = 1000, nullable = false)
    private String messageContent;

    @Column
    private Boolean readChk;

    @Builder
    public Message(Long messageID, User sendUser, User recvUser,
                   Long roomID, LocalDateTime sendTime, LocalDateTime readTime,
                   String messageContent,  Boolean readChk) {
        this.messageID = messageID;
        this.sendUser = sendUser;
        this.recvUser = recvUser;
        this.roomID = roomID;
        this.sendTime = sendTime;
        this.readTime = readTime;
        this.messageContent = messageContent;
        this.readChk = readChk;
    }

    public MessageResponseDTO toDTO(Message message){
        return MessageResponseDTO.builder()
                .res(message).build();
    }
}
