package matchTeam.crewcrew.service;

import matchTeam.crewcrew.repository.MemberRepository;
import matchTeam.crewcrew.repository.MemoryMemberRepository;

public class MemberService {
    private final MemberRepository memberRepository = new MemoryMemberRepository();

}
