package matchTeam.crewcrew.user;

import matchTeam.crewcrew.entity.user.test.Member;
import matchTeam.crewcrew.entity.user.test.MemberRepository;
import matchTeam.crewcrew.entity.user.test.Team;
import matchTeam.crewcrew.entity.user.test.TeamRepository;
import org.assertj.core.api.AbstractFileAssert;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;


import java.util.List;
//@Transactional
@SpringBootTest
public class JpaCascadeTest {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Test
    @Transactional
    @Rollback(true)
    @DisplayName("CascadeType.REMOVE - 부모 엔티티(Team)을 삭제하는 경우")
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

    @Test
    @Transactional
    @Rollback(true)
    @DisplayName("CascadeType.REMOVE - 부모 엔티티(Team)에서 자식엔티티(Member)를 제거하는 경우")
    void cascadeType_Remove_IncaseOfTeamRemovalFromTeam() {
        //given
        Member member1 = new Member();
        Member member2 = new Member();

        Team team =new Team();

        team.addMember(member1);
        team.addMember(member2);

        teamRepository.save(team);
        //when
        team.getMembers().remove(0);

        //then
        List<Team> teams = teamRepository.findAll();
        List<Member> members =memberRepository.findAll();


//        Assert.a
        assertThat(teams.size(),is(1));
        assertThat(members.size(),is(2));


    }

    @Transactional
    @Test
    @Rollback(true)
    void orphanRemoval_True_IncaseOfTeamRemoval() {
        //given
        Member member1 = new Member();
        Member member2 = new Member();

        Team team =new Team();

        team.addMember(member1);
        team.addMember(member2);

        teamRepository.save(team);
        //when
//        team.getMembers().remove(0);
        teamRepository.delete(team);

        //then
        List<Team> teams = teamRepository.findAll();
        List<Member> members =memberRepository.findAll();


//        Assert.a
        assertThat(teams.size(),is(0));
        assertThat(members.size(),is(0));


    }



}
