package matchTeam.crewcrew.Service;

import matchTeam.crewcrew.Entity.User;
import matchTeam.crewcrew.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public long join(User user){
        if(validateDuplicateMember(user)) {
            userRepository.save(user);
            return user.getUid();
        }else{
            return -1;
        }
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

    private boolean validateDuplicateMember(User user){
        if (userRepository.findByEmail(user.getEmail()).isEmpty()){
            return true;
        }else{
            return false;
        }
    }

}
