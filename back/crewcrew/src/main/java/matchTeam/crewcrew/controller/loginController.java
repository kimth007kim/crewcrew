package matchTeam.crewcrew.controller;

import matchTeam.crewcrew.domain.User;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class loginController {

    @GetMapping("/showUser")
    // Rest 방식을 사용하기 때문에 URL 동사형식은 쓰면 안된다

    public List<User> Login(){

        // 멤버여러개 뺴와서 정보를 찾아보는 메서드

        List<User> user = new ArrayList<User>();
        user.add(new User(1,"kimth007kim@naver.com","1234",null));
        user.add(new User(2,"aaaabbbbcccc123@naver.com","0987",null));
        user.add(new User(3,"rlarudehd12@class.com","25341587453",null));
        return user;
    }


    @PostMapping("/hellos")
    public User Login(User user ){
        User member  = new User();

            member.setEmail(user.getEmail());
            member.setPassword(user.getPassword());
            member.setImgFile(user.getImgFile());

        return member;
    }


    static class CreateMemberRequest{
        private String name;
    }

}
