package matchTeam.crewcrew.service;

import matchTeam.crewcrew.domain.User;
import matchTeam.crewcrew.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long join(User user){
    //  validateDuplicateMember(user);
        userRepository.save(user);
        return user.getId();
    }

//    private void validateDuplicateMember(User user){
//        userRepository.findByName(user.getName()).ifPresent
//    }

}
