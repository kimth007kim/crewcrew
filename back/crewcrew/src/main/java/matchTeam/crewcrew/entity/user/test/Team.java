package matchTeam.crewcrew.entity.user.test;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "team",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
    orphanRemoval = true)
    private List<Member> members = new ArrayList<>();

    public void addMember(Member member) {
        members.add(member);
        member.setTeam(this);
    }


    public Team() {

    }
}
