package matchTeam.crewcrew.controller;

import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.dto.UserDTO;
import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.ConfirmationTokenService;
import matchTeam.crewcrew.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {
    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(UserService userService, ConfirmationTokenService confirmationTokenService,BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.confirmationTokenService = confirmationTokenService;
        this.bCryptPasswordEncoder=bCryptPasswordEncoder;
    }

    @GetMapping("/users")
    public ResponseEntity<Object> list() {
        List<User> users = userService.findUsers();
//        List<User> result = users.stream().map(o -> new User(o)).collect(Collectors.toList());

        return ResponseHandler.generateResponse("list called Success", HttpStatus.OK, null);
    }
    @GetMapping("/login")
    public ResponseEntity<Object> loginPage() {
        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, "login");

    }

//    @PostMapping("/login")
//    public ResponseEntity<Object> Login(String email,String password) {
//        if (userService.login(email,password) == true) {
////        if (userService.login(userDTO.getEmail(), userDTO.getPassword()) == true) {
//            return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, null);
//        }else{
//            return ResponseHandler.ErrorResponse(ErrorCode.LOGIN_FAILED);
//
//        }
////        return ResponseHandler.generateResponse("Login Fail", HttpStatus.OK, null);
//
//    }


    @PostMapping("/email")
    public ResponseEntity<Object> SendEmail(String email) {

    //email 주소 형식 에  맞는지 확인하는 메서드
        confirmationTokenService.createEmailConfirmationToken(email);
    //이미 가입되었는지 확인하는 메서드드
    // 이메일 전송하는메서드

        return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, null);

    }
    @GetMapping("confirm-email")
    public String viewConfirmEmail(@Valid @RequestParam  String token){
        userService.confirmEmail(token);

        return "redirect:/login";
    }

    @GetMapping("/join")
    public ResponseEntity<Object> joinPage() {
        return ResponseHandler.generateResponse("join Page", HttpStatus.OK, "join");

    }

    @PostMapping("/join")
    public ResponseEntity<Object> join( UserDTO userDTO) {
//    public ResponseEntity<Object> join(@RequestParam("profileImage") MultipartFile file, User user) {

        System.out.println(userDTO.getEmail());
        System.out.println(userDTO.getPassword());
        System.out.println(userDTO.getNickname());
        System.out.println(userDTO.getIntroduce());

        User user = new User();
        user.toString();
        user.setRole("USER");
        user.setEmail(userDTO.getEmail());

        String rawPassword = userDTO.getPassword();
        String enPassword= bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(enPassword);

        user.setNickname(userDTO.getNickname());
        user.setIntroduce(userDTO.getIntroduce());

        user.toString();

        long pid = userService.join(user);
        if (pid == -1) {
            return ResponseHandler.ErrorResponse(ErrorCode.EMAIL_ALREADY_EXIST);

        } else {
            return ResponseHandler.generateResponse("Join Success", HttpStatus.OK, user);
        }

    }
}
