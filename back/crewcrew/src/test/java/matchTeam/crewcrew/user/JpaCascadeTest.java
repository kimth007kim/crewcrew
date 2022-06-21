package matchTeam.crewcrew.user;

import matchTeam.crewcrew.entity.user.test.Member;
import matchTeam.crewcrew.entity.user.test.MemberRepository;
import matchTeam.crewcrew.entity.user.test.Team;
import matchTeam.crewcrew.entity.user.test.TeamRepository;
import org.assertj.core.api.AbstractFileAssert;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;


import java.util.List;

@SpringBootTest
public class JpaCascadeTest {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Test
    void cascadeType_Remove_IncaseOfTeamRemoval() {
        //given
        Member member1 = new Member();
        Member member2 = new Member();

        Team team =new Team();

        team.addMember(member1);
        team.addMember(member2);

        teamRepository.save(team);
        //when
        teamRepository.delete(team);

        //then
        List<Team> teams = teamRepository.findAll();
        List<Member> members =memberRepository.findAll();


//        Assert.a
        assertThat(teams.size(),is(0));
        assertThat(members.size(),is(0));


    }



}
