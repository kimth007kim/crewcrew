package matchTeam.crewcrew;

import matchTeam.crewcrew.dto.application.ApplicationMyCrewResponseDTO;
import matchTeam.crewcrew.dto.application.UpdateApplyRequestDTO;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.application.ApplicationQueryRepository;
import matchTeam.crewcrew.service.application.ApplicationService;
import matchTeam.crewcrew.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Transactional
@SpringBootTest
public class ApplicationQueryTest {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;
    
    @Test
    void updateApply() throws Exception{
        //given
        User user = userService.findByUid(5L);
        //when

        ApplicationMyCrewResponseDTO myCrewCount = applicationService.findMyCrewCount(user);
        //then

        System.out.println("myCrewCount.getMyCrewCount() = " + myCrewCount.getMyCrewCount());
    }

    @Test
    void getArrivedApplication() throws Exception{
        //given


        //when


        //then

    }
}
