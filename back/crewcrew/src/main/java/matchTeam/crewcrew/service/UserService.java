package matchTeam.crewcrew.service;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.ConfirmationToken;
import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;


//    public long join(User user){
//        if(validateDuplicateMember(user.getEmail())) {
//            userRepository.save(user);
//            return user.getUid();
//        }else{
//            return -1;
//        }
//    }

    public long join(User user) {
            userRepository.save(user);
            return user.getUid();
    }
    public boolean login(String email,String password){
       Optional<User> result = userRepository.findByEmail(email);
//       자바 optional 배열이 null 이면 id fail리턴
        if (result.isEmpty()){
            return false;
        }else{
            User user=result.get();
            if (user.getPassword().equals(password)) {
                return true;
            }else{
                return false;
            }
        }
    }

    public List<User> findUsers(){
        return userRepository.findAll();
    }
    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public boolean validateDuplicateMember(String email){
        if (userRepository.findByEmail(email).isEmpty()){
            return true;
        }else{
            return false;
        }
    }

    public void confirmEmail(String token) {
        ConfirmationToken findConfirmationToken =confirmationTokenService.findByIdAndExpirationDateAfterAndExpired(token);
//        User user = findByEmail(findConfirmationToken.getEmail());
        findConfirmationToken.useToken();

    }
}
