package com.booking.codeinn.security;

import  com.booking.codeinn.security.JWT.JwtEntryPoint;
import  com.booking.codeinn.security.JWT.JwtTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MainSecurity extends WebSecurityConfigurerAdapter{

    @Autowired
    JwtEntryPoint jwtEntryPoint;

    @Bean
    public JwtTokenFilter jwtTokenFilter(){
        return new JwtTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    public void configure(WebSecurity web){
        web.ignoring()
                .antMatchers(
                        "/v2/api-docs",
                        "/swagger-resources/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/configuration/**",
                        "/webjars/**",
                        "/public");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                //---> Home
		        .antMatchers("/home/**").permitAll()
                //---> Categories
                .antMatchers("/categories/all").permitAll()
                .antMatchers("/categories/id/**").permitAll()
                .antMatchers("/categories/create").hasAuthority("ROLE_ADMIN")
                .antMatchers("/categories/edit").hasAuthority("ROLE_ADMIN")
                .antMatchers("/categories/delete/**").hasAuthority("ROLE_ADMIN")
                //---> Cities
                .antMatchers("/cities/all").permitAll()
                .antMatchers("/cities/create").hasAuthority("ROLE_ADMIN")
                .antMatchers("/cities/edit").hasAuthority("ROLE_ADMIN")
                .antMatchers("/cities/delete/**").hasAuthority("ROLE_ADMIN")
                //---> Accommodations
                .antMatchers("/accommodations/all").permitAll()
                .antMatchers("/accommodations/id/**").permitAll()
                .antMatchers("/accommodations/search").permitAll()
                .antMatchers("/accommodations/create").hasAuthority("ROLE_ADMIN")
                .antMatchers("/accommodations/edit").hasAuthority("ROLE_ADMIN")
                .antMatchers("/accommodations/delete/**").hasAuthority("ROLE_ADMIN")
                //---> Reservations
                .antMatchers("/reservations/all").hasAuthority("ROLE_ADMIN")
                .antMatchers("/reservations/id/**").hasAuthority("ROLE_ADMIN")
                .antMatchers("/reservations/edit").hasAuthority("ROLE_ADMIN")
                .antMatchers("/reservations/accommodation/**").permitAll() //Esto se debe cambiar a futuro
                .antMatchers("/reservations/create").hasAuthority("ROLE_USER")
                .antMatchers("/reservations/user/**").hasAuthority("ROLE_USER")
                //---> Characteristics
                .antMatchers("/characteristics/all").hasAuthority("ROLE_ADMIN")
                .antMatchers("/characteristics/create").hasAuthority("ROLE_ADMIN")
                .antMatchers("/characteristics/edit").hasAuthority("ROLE_ADMIN")
                .antMatchers("/characteristics/delete/**").hasAuthority("ROLE_ADMIN")
                //---> Auth login and register
                .antMatchers("/auth/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

}