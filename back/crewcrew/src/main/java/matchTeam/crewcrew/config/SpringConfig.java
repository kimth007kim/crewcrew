package matchTeam.crewcrew.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
//    @Bean
//    public UserService userService(){
//        return new UserService(userRepository());
//    }
//    @Bean
//    public UserRepository userRepository(){
//        return new JpaUserRepository(em);
//    }
}

