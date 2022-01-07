package matchTeam.crewcrew.controller;

import matchTeam.crewcrew.dto.ErrorCode;
import matchTeam.crewcrew.dto.UserDTO;
import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Object> list() {
        List<User> users = userService.findUsers();
        List<UserDTO> result = users.stream().map(o -> new UserDTO(o)).collect(Collectors.toList());

        return ResponseHandler.generateResponse("list called Success", HttpStatus.OK, result);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> Login(String email, String password) {
        if (userService.login(email, password) == true) {
            return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, null);
        }else{
            return ResponseHandler.ErrorResponse(ErrorCode.LOGIN_FAILED);

        }
//        return ResponseHandler.generateResponse("Login Fail", HttpStatus.OK, null);

    }


    @PostMapping("/join")
    public ResponseEntity<Object> join( User user) {
//    public ResponseEntity<Object> join(@RequestParam("profileImage") MultipartFile file, User user) {

        User user1 = new User();
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setNickname(user.getNickname());
        user1.setIntroduce(user.getIntroduce());
        long pid = userService.join(user1);
        if (pid == -1) {
            return ResponseHandler.ErrorResponse(ErrorCode.EMAIL_ALREADY_EXIST);

        } else {
            return ResponseHandler.generateResponse("Join Success", HttpStatus.OK, user1);
        }

    }


    /**
     * DTO 로 바꾸는 작업
     *
     @PostMapping("/join") public ResponseEntity<Message> join(@RequestParam("profileImage") MultipartFile file, User user) {
     UserDTO userDTO = new UserDTO(user);
     long pid =userService.join(userDTO);
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
     */

}
