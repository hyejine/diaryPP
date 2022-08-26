package com.example.demo.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration         // Bean 관리 
@EnableWebSecurity     // Spirng Security 설정 활성화
public class SecurityJavaConfig extends WebSecurityConfigurerAdapter{

    // private final UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http 
                .cors().disable()		//cors 방지
                .csrf().disable()   	//csrf 공격방지
                .headers().frameOptions().disable()
             .and()
             .formLogin().disable();
                // .authorizeRequests() 
                // .antMatchers().permitAll();  //누구나 접근 가능한 페이지 
            //  .and()
            //     .formLogin() // 로그인에 대한 설정 	
            //     .loginPage("/login")
            //     .loginProcessingUrl("/login") // login 주소가 호출 되면 시큐리티가 대신 로그인 진행 
            //     .defaultSuccessUrl("/") 
            //  .and()
            //     .logout()
            //     .logoutSuccessUrl("/")
            //     .invalidateHttpSession(true); // 로그아웃시 저장해 둔 세션 날리기 
                
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // 로그인 시 필요한 정보 가져다 줌 
    // @Override
    // public void configure(AuthenticationManagerBuilder auth) throws Exception {
    //     auth.userDetailsService(userService)
    //     .passwordEncoder(new BCryptPasswordEncoder());
    // }
    
}
