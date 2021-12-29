package matchTeam.crewcrew.service;

import matchTeam.crewcrew.domain.User;
import matchTeam.crewcrew.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userService {
    private final userRepository memberRepository;

    @Autowired
    public userService(userRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Long join(User user){
//        validateDuplicateMember(user);
        memberRepository.save(user);
        return user.getId();
    }

//    private void validateDuplicateMember(User user){
//        userRepository.findByName(member.getName()).ifPresent
//    }

}
