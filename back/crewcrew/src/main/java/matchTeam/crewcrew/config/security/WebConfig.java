package matchTeam.crewcrew.config.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://crewcrew.org","https://crewcrew.org","https://www.crewcrew.org","http://175.193.24.44:3000")
                .allowedMethods("POST", "GET","PATCH", "PUT", "OPTIONS", "DELETE", "HEAD")
                .allowedHeaders("*")
                .exposedHeaders("X-AUTH-TOKEN","refresh-Token")
                .allowCredentials(true);
    }
}