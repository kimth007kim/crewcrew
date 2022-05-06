package matchTeam.crewcrew.service.user;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.auth.CUserNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userPk) throws  CUserNotFoundException{
        Optional<User> user = userRepository.findById(Long.parseLong(userPk));

        if (user.isEmpty()){
             throw new CUserNotFoundException();
        }
//        return userRepository.findById(Long.parseLong(userPk)).orElseThrow(CUserNotFoundException::new);

        return user.get();

//                Optional<User> user =userRepository.findByEmail(email);
//        return user.orElseThrow(()->new UsernameNotFoundException(email));
    }
}
