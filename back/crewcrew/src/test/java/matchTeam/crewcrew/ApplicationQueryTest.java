package matchTeam.crewcrew;

import matchTeam.crewcrew.repository.application.ApplicationQueryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Transactional
@SpringBootTest
public class ApplicationQueryTest {

    @Autowired
    private ApplicationQueryRepository queryRepository;

    @Test
    void getMyApplication() throws Exception{
        //given
        queryRepository.getMyApplication(6L);

        //when


        //then

    }
}
