package matchTeam.crewcrew.service.user;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.CUserNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userPk) throws CUserNotFoundException{
        return userRepository.findById(Long.parseLong(userPk)).orElseThrow(CUserNotFoundException::new);
//                Optional<User> user =userRepository.findByEmail(email);
//        return user.orElseThrow(()->new UsernameNotFoundException(email));
    }
}
