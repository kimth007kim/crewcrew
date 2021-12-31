package matchTeam.crewcrew.controller;

import matchTeam.crewcrew.domain.User;
import matchTeam.crewcrew.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/find")
    // Rest 방식을 사용하기 때문에 URL 동사형식은 쓰면 안된다
    public List<User> Login(){

        // 멤버여러개 뺴와서 정보를 찾아보는 메서드
        List<User> user = new ArrayList<User>();
        return user;
    }


    @PostMapping("/join")
    public User Login(@RequestParam("file") MultipartFile file, User user) throws IOException {
            User user1  = new User();
            user1.setEmail(user.getEmail());
            user1.setPassword(user.getPassword());
            byte[] bytes= file.getBytes();
            user1.setFiles(bytes);
            userService.join(user1);
        return user1;
    }


    @PostMapping("/user/login")
    public Cookie cookie(){


        return cookie();
    }

}
