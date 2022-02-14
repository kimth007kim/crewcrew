package matchTeam.crewcrew.repository.user;

import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.exception.auth.CUserNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserJpaRepoTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private String name = "kyungdong";
    private String email = "kimkyungdong@naver.com";
    private String password = "wonsik";

    @Test
    public void 회원저장_후_이메일로_회원검색() throws Exception{

        //given
        userRepository.save(User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(name)
                .roles(Collections.singletonList("ROLE_USER"))
                .build());

        //when
        User user =userRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
//        Assert



    }

}
