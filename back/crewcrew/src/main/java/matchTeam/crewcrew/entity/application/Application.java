package matchTeam.crewcrew.entity.application;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.dto.application.ApplicationSaveResponseDTO;
import matchTeam.crewcrew.dto.application.ApplicationStatus;
import matchTeam.crewcrew.entity.BaseTimeEntity;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.user.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "application", indexes = {
        @Index(name = "fk_application_board_idx", columnList = "board_id"),
        @Index(name = "fk_application_user_idx", columnList = "uid")
})
@Entity
public class Application extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(name = "commentary")
    private String commentary;

    @Column(name = "progress")
    private Integer progress;

    @Builder
    public Application(Board board, User user, String commentary) {
        this.board = board;
        this.user = user;
        this.commentary = commentary;
        this.progress= 1;
    }

    public void updateProgress(Integer progressCode){
        this.progress = progressCode;
    }

    public ApplicationSaveResponseDTO toDTO(Application application){
        return ApplicationSaveResponseDTO.builder()
                .res(application).build();
    }
}