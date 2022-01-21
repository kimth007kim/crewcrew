package matchTeam.crewcrew.auth;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.oauth2.entity.UserPrincipal;
import matchTeam.crewcrew.repository.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

//        return userRepository.findByEmail(username)
//                .orElseThrow(()->new UsernameNotFoundException("사용자를 찾을수없습니다."));
        Optional<User> user =userRepository.findByEmail(username);
        if (user.get() == null) {
            throw new UsernameNotFoundException("Can not find username.");
        }
        return UserPrincipal.create(user.get());
    }
}
