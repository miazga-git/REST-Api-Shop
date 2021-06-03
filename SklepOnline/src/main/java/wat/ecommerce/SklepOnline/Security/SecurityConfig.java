package wat.ecommerce.SklepOnline.Security;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    /*protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("user1").password(passwordEncoder().encode("user1Pass")).roles("USER")
                .and()
                .withUser("user2").password(passwordEncoder().encode("user2Pass")).roles("USER")
                .and()
                .withUser("admin").password(passwordEncoder().encode("adminPass")).roles("ADMIN");
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }*/


    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors()
                .and()
                .authorizeRequests()
                .antMatchers("/api/checkuser").hasAuthority("USER")
                .antMatchers("/h2-console/***").permitAll()//na potrzeby debugowania.hasRole("ADMIN")
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/iteminfo").permitAll()
                .antMatchers("/api/userinfo").permitAll()
                .antMatchers("/api/deleteorder/*").hasAuthority("USER")
                //.antMatchers("/api/checkuser").permitAll()
                .antMatchers("/api/adduser").permitAll()
                //.antMatchers("/basketinfo").hasRole("ADMIN")
                //.antMatchers("/basketinfo").hasRole("ADMIN")
                .and()
                .exceptionHandling()
                .and()
                //.formLogin()
                .httpBasic();
        http.headers().frameOptions().disable();
        //.authenticationEntryPoint(restAuthEntryPoint);
        //.and()
        //.formLogin().loginProcessingUrl("/login");
    }

 	private final UserRepositoryUserDetailsService userRepositoryUserDetailsService;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;
  @Autowired
  DataSource dataSource;

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {

        auth.userDetailsService(userRepositoryUserDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);

    }


}