package matchTeam.crewcrew.entity.user.test;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn
    private Team team;
    public Member(){

    }
}
