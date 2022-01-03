package matchTeam.crewcrew.controller;

import lombok.Data;
import matchTeam.crewcrew.Entity.User;
import matchTeam.crewcrew.dto.JoinFailed;
import matchTeam.crewcrew.dto.Message;
import matchTeam.crewcrew.dto.StatusEnum;
import matchTeam.crewcrew.service.UserService;
import org.hibernate.mapping.Join;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import java.nio.charset.Charset;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {
    private final UserService userService;
//    private final MainService mainService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<Message> list() {
        List<User> users= userService.findUsers();
        List<UserDto> result = users.stream().map(o->new UserDto(o)).collect(Collectors.toList());

        Message message = new Message();
        HttpHeaders headers =new HttpHeaders();
        Charset utf8= Charset.forName("UTF-8");
        MediaType mediaType= new MediaType("application","json",utf8);
        headers.setContentType(mediaType);

        message.setStatus(StatusEnum.OK);
        message.setMessage("성공 코드");
        message.setData(result);
        return new ResponseEntity<>(message,headers, HttpStatus.OK);
    }

//    @GetMapping("/users")
//    public List<UserDto> list(){
//        List<User> users= userService.findUsers();
//        List<UserDto> result = users.stream().map(o->new UserDto(o)).collect(Collectors.toList());
//        // 멤버여러개 뺴와서 정보를 찾아보는 메서드
//        return result;
//    }

    @Data
    static class UserDto{
        private Long uid;
        private String email;
        private String password;

        public UserDto(User user) {
            uid = user.getUid();
            email= user.getEmail();
            password=user.getPassword();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Message> Login(String email, String password) {
        Message message = new Message();
        HttpHeaders headers =new HttpHeaders();
        Charset utf8= Charset.forName("UTF-8");
        MediaType mediaType= new MediaType("application","json",utf8);
        headers.setContentType(mediaType);

        message.setStatus(StatusEnum.OK);
        message.setMessage("성공 코드");
        message.setData(userService.login(email, password));
        return new ResponseEntity<>(message,headers, HttpStatus.OK);
    }


//    @PostMapping("/join")
////    public User Login(@RequestParam("file") MultipartFile file, User user) throws IOException {
//    public User Login(User user) {
//            User user1  = new User();
//            user1.setEmail(user.getEmail());
//            user1.setPassword(user.getPassword());
//            user1.setProfileimage(user.getProfileimage());
//            user1.setNickname(user.getNickname());
//            user1.setIntroduce(user.getIntroduce());
//
//            userService.join(user1);
//        return user1;
//    }
    @PostMapping("/join")
    public ResponseEntity<Message> join(@RequestParam("profileImage") MultipartFile file, User user) {
        User user1  = new User();
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setProfileimage(user.getProfileimage());
        user1.setNickname(user.getNickname());
        user1.setIntroduce(user.getIntroduce());
        long pid =userService.join(user1);
        Message message = new Message();
        HttpHeaders headers =new HttpHeaders();
        Charset utf8= Charset.forName("UTF-8");
        MediaType mediaType= new MediaType("application","json",utf8);
        headers.setContentType(mediaType);
        if (pid ==-1){
            JoinFailed fail=new JoinFailed();
            message.setStatus(StatusEnum.OK);
            message.setMessage("성공 코드");
            message.setData(fail);
            return new ResponseEntity<>(message,headers, HttpStatus.OK);
        }else {

            message.setStatus(StatusEnum.OK);
            message.setMessage("성공 코드");
            message.setData(user1);
            return new ResponseEntity<>(message,headers, HttpStatus.OK);
        }

    }

}
