package matchTeam.crewcrew.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;

@Configuration
public class SpringConfig {
    private final EntityManager em;


    public SpringConfig( EntityManager em) {
        this.em = em;
    }

    @Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}

