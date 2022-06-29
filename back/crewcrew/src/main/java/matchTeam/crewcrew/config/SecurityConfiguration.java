package matchTeam.crewcrew.config;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.CustomAccessDeniedHandler;
import matchTeam.crewcrew.config.security.JwtAuthenticationFilter;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.config.security.CustomAuthenticationEntryPoint;
import matchTeam.crewcrew.service.user.CookieService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtProvider jwtProvider;
    private final CookieService cookieService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
//                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()
//                            .antMatchers("/*/user").hasAnyRole("USER")
                            .antMatchers("/","/*/signup","/*/login","/auth/**","/oauth/**", "/message/**", "/bookmark/**","/talk/**").permitAll()
                            .antMatchers("/chat/**","/ws/**","/ws-stomp/**").permitAll()
                            .antMatchers("/exception/**","/s3/**").permitAll()
                            .antMatchers("/board/**").permitAll()
                            .antMatchers("/boardlist/**").permitAll()
                            .antMatchers("/category/**").permitAll()
                            .antMatchers("/profile/**").permitAll()
                            .antMatchers("/application/**").permitAll()
                            .anyRequest().hasRole("USER")
//                            .anyRequest().permitAll()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .accessDeniedHandler(customAccessDeniedHandler)
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }



    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/resources/**","/css/**","fonts/**","/js/**","/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui.html", "/webjars/**", "/swagger/**", "/h2-console/**");
    }

}
