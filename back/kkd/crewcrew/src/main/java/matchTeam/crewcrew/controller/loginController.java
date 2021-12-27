package matchTeam.crewcrew.controller;

import matchTeam.crewcrew.domain.Member;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class loginController {

    @GetMapping("/showUser")
    // Rest 방식을 사용하기 때문에 URL 동사형식은 쓰면 안된다

    public List<Member> Login(){

        // 멤버여러개 뺴와서 정보를 찾아보는 메서드

        List<Member> member = new ArrayList<Member>();
        member.add(new Member("kimth007kim@naver.com","1234"));
        member.add(new Member("aaaabbbbcccc123@naver.com","0987"));
        member.add(new Member("rlarudehd12@class.com","25341587453"));
        return member;
    }


    @PostMapping("/hellos")
    public Member Login(@RequestBody Member member){
        member.setEmail(member.getEmail());
        member.setPassword(member.getPassword());
        return member;
    }

    static class CreateMemberRequest{
        private String name;
    }

}
