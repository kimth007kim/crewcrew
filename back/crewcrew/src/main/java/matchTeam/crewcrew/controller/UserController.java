package matchTeam.crewcrew.controller;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.auth.JwtTokenProvider;
import matchTeam.crewcrew.dto.JoinSuccess;
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
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider jwtTokenProvider;



    @GetMapping("/users")
    public ResponseEntity<Object> list() {
        List<User> users = userService.findUsers();
//        List<User> result = users.stream().map(o -> new User(o)).collect(Collectors.toList());

        return ResponseHandler.generateResponse("list called Success", HttpStatus.OK, null);
    }
//    @GetMapping("/login")
//    public ResponseEntity<Object> loginPage() {
//        return ResponseHandler.generateResponse("Login Page", HttpStatus.OK, "login");
//
//    }

    @PostMapping("/login")
    public ResponseEntity<Object> Login(String email,String password) {

        User member = userService.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));
        if (!bCryptPasswordEncoder.matches(password, member.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return ResponseHandler.generateResponse("Login Success", HttpStatus.OK, jwtTokenProvider.createToken(member.getUsername()));
    }



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


    // 유저 정보를 (쿠키)토대로 반환하는 API(GET) @GetMapping(/user)

    @PostMapping("/join")
    public ResponseEntity<Object> Join( UserDTO userDTO) {
//    public ResponseEntity<Object> join(@RequestParam("profileImage") MultipartFile file, User user) {
        boolean emailExist=userService.validateDuplicateMember(userDTO.getEmail());
        if (emailExist ==false) {
            return ResponseHandler.ErrorResponse(ErrorCode.EMAIL_ALREADY_EXIST);

        } else {
            long userPk =userService.join(User.builder()
                            .email(userDTO.getEmail())
                            .password(bCryptPasswordEncoder.encode(userDTO.getPassword()))
                            .name(userDTO.getName())
                            .nickname(userDTO.getNickname())
                            .build());
            JoinSuccess joinSuccess= new JoinSuccess(userPk,userDTO.getEmail(), userDTO.getName(), userDTO.getNickname());

            return ResponseHandler.generateResponse("Join Success", HttpStatus.OK, joinSuccess);
        }

    }



}
