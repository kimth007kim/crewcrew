package matchTeam.crewcrew.controller;

import matchTeam.crewcrew.dto.ErrorCode;
import matchTeam.crewcrew.dto.UserDTO;
import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.ConfirmationTokenService;
import matchTeam.crewcrew.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {
    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;

    @Autowired
    public UserController(UserService userService, ConfirmationTokenService confirmationTokenService) {
        this.userService = userService;
        this.confirmationTokenService = confirmationTokenService;
    }

    @GetMapping("/users")
    public ResponseEntity<Object> list() {
        List<User> users = userService.findUsers();
//        List<User> result = users.stream().map(o -> new User(o)).collect(Collectors.toList());

        return ResponseHandler.generateResponse("list called Success", HttpStatus.OK, null);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> Login(String email,String password) {
        if (userService.login(email,password) == true) {
//        if (userService.login(userDTO.getEmail(), userDTO.getPassword()) == true) {
            return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, null);
        }else{
            return ResponseHandler.ErrorResponse(ErrorCode.LOGIN_FAILED);

        }
//        return ResponseHandler.generateResponse("Login Fail", HttpStatus.OK, null);

    }
    @PostMapping("/email")
    public ResponseEntity<Object> SendEmail(String email) {

    //email 주소 형식 에  맞는지 확인하는 메서드
        confirmationTokenService.createEmailConfirmationToken(email);
    //이미 가입되었는지 확인하는 메서드드
    // 이메일 전송하는메서드

        return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, null);

    }


    @PostMapping("/join")
    public ResponseEntity<Object> join( UserDTO userDTO) {
//    public ResponseEntity<Object> join(@RequestParam("profileImage") MultipartFile file, User user) {

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setNickname(userDTO.getNickname());
        user.setIntroduce(userDTO.getIntroduce());
        long pid = userService.join(user);
        if (pid == -1) {
            return ResponseHandler.ErrorResponse(ErrorCode.EMAIL_ALREADY_EXIST);

        } else {
            return ResponseHandler.generateResponse("Join Success", HttpStatus.OK, user);
        }

    }



}
