package matchTeam.crewcrew;

import matchTeam.crewcrew.dto.application.UpdateApplyRequestDTO;
import matchTeam.crewcrew.repository.application.ApplicationQueryRepository;
import matchTeam.crewcrew.service.application.ApplicationService;
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

    @Test
    void updateApply() throws Exception{
        //given

        applicationService.updateApply(new UpdateApplyRequestDTO(1L, 6L, 3));

        //when

        //then

    }

    @Test
    void getArrivedApplication() throws Exception{
        //given


        //when


        //then

    }
}
