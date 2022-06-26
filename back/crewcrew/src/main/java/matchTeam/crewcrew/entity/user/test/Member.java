package matchTeam.crewcrew.entity.user.test;

import lombok.Getter;
import lombok.Setter;
import matchTeam.crewcrew.entity.chat.ChatRoom;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
