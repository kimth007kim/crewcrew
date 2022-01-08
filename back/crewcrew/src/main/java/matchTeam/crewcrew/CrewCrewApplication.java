package matchTeam.crewcrew;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing //JPA에서 시간을 자동으로 넣어주는 기능
@SpringBootApplication
public class CrewCrewApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrewCrewApplication.class, args);
	}

}
