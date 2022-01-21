package matchTeam.crewcrew.config;

import lombok.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {



    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/lib/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/oauth2/**", "/login/**", "/css/**", "/images/**", "/js/**", "/console/**", "/favicon.ico/**")
                .permitAll()
//                .antMatchers("/kakao/").hasAuthority(KAKAO.getRoleType())
//                .antMatchers("/naver/").hasAuthority(NAVER.getRoleType())
                .antMatchers("/user/**").hasRole("USER")
                .antMatchers("/manager/**").hasRole("MANAGER")
                .antMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().permitAll();
    }


//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository(
//            OAuth2ClientProperties oAuth2ClientProperties, @Value("${custom.oauth2.kakao.client-id}") String kakaoClientId){
////            @Value("${custom.oauth2.kakao.client-id}") String kakaoClientId,
////            @Value("${custom.oauth2.naver.client-id}") String naverClientId){
////        List<ClientRegistration> registrations =oAuth2ClientProperties.getRegistration().keySet().stream().map(client->)
//        return new InMemoryClientRegistrationRepository(registration);
//    }

//@Bean
//public ClientRegistrationRepository clientRegistrationRepository(
//        OAuth2ClientProperties oAuth2ClientProperties
//        , @Value("${custom.oauth2.kakao.client-id}") String kakaoClientId
//        , @Value("${custom.oauth2.kakao.client-secret}") String kakaoClientSecret
//        , @Value("${custom.oauth2.naver.client-id}") String naverClientId, @Value("${custom.oauth2.naver.client-secret}") String naverClientSecret) {
//        List<ClientRegistration> registrations = oAuth2ClientProperties .getRegistration().keySet().stream() .map(client -> getRegistration(oAuth2ClientProperties, client)) .filter(Objects::nonNull) .collect(Collectors.toList()); registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao") .clientId(kakaoClientId) .clientSecret(kakaoClientSecret) .jwkSetUri("temp") .build()); registrations.add(CustomOAuth2Provider.NAVER.getBuilder("naver") .clientId(naverClientId) .clientSecret(naverClientSecret) .jwkSetUri("temp") .build()); return new InMemoryClientRegistrationRepository(registrations); }


    @Bean
    public BCryptPasswordEncoder encodePwd(){
        return new BCryptPasswordEncoder();
    }
}
