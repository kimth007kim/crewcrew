package matchTeam.crewcrew.auth;

import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.repository.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


// 시큐리티 설정에서 loginProcessUrl("login") 해놨기에
// /login 요청이 오면 자동으로 UserDetailsService 타입으로 IOC되어있는 loadUserByUsername 함수가 실행
@Service
public class PrincipalDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public PrincipalDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            Optional<User> userEntity =userRepository.findByEmail(username);
            User user = userEntity.orElseThrow(() -> new UsernameNotFoundException(username));
            return new PrincipalDetails(user);

        }
}
