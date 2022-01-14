package matchTeam.crewcrew;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing //JPA에서 시간을 자동으로 넣어주는 기능
@SpringBootApplication
//@SpringBootApplication(exclude = SecurityAutoConfiguration.class) // 시큐리티 비밀번호 입력하는것을 피하기위해 추가했음 추후 배포할때 없애도될듯
public class CrewCrewApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrewCrewApplication.class, args);
	}

}
