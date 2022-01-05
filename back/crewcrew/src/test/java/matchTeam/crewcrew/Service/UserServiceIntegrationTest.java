package matchTeam.crewcrew.Service;


import matchTeam.crewcrew.Entity.User;
import matchTeam.crewcrew.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceIntegrationTest {
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;

    @Test
    public void 회원가입() throws Exception{
        User user =new User();
        user.setNickname("KIM");

        Long saveId = userService.join(user);
//        User findBy
    }
}
