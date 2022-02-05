package matchTeam.crewcrew.config;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.config.security.CustomAccessDeniedHandler;
import matchTeam.crewcrew.config.security.JwtAuthenticationFilter;
import matchTeam.crewcrew.config.security.JwtProvider;
import matchTeam.crewcrew.config.security.CustomAuthenticationEntryPoint;
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
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()
//                            .antMatchers("/*/users").hasRole("ADMIN")
                            .antMatchers("/*/signup","/*/login","/*/reissue").permitAll()
                            .antMatchers(HttpMethod.GET,"/exception/**").permitAll()
//                            .anyRequest().hasRole("USER")
                .and()
                    .exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint)
                .and()
                    .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler)
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui.html", "/webjars/**", "/swagger/**", "/h2-console/**");
    }

}
