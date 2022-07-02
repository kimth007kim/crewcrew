//package matchTeam.crewcrew.entity.user.test;
//
//import lombok.RequiredArgsConstructor;
//import matchTeam.crewcrew.response.ErrorCode;
//import matchTeam.crewcrew.response.exception.CrewException;
//import org.springframework.stereotype.Service;
//
//
//
//@RequiredArgsConstructor
//@Service
//public class MemberService {
//    private final MemberRepository memberRepository;
//
//
//    public void register(Member member){
//        StringBuilder image = new StringBuilder();
//        Long id = member.getId();
//        image.append("https://crewcrewbucket.s3.ap-northeast-2.amazonaws.com/default/");
//        image.append(id%5+1);
//        image.append(".png");
//
//        StringBuilder nick = new StringBuilder();
//        nick.append(id);
//        nick.append("번유저");
//        member.setImage(image.toString());
//        member.setNickName(nick.toString());
//        memberRepository.save(member);
//    }
//
//}
