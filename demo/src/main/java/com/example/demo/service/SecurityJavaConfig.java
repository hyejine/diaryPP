package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.service.auth.AuthDetailsService;

@Configuration         // Bean 관리 
@EnableWebSecurity     // Spirng Security 설정 활성화 (사이트 전체가 잠김 상태)
public class SecurityJavaConfig extends WebSecurityConfigurerAdapter{

    @Autowired 
    AuthDetailsService authDetailsService;

    @Override
	public void configure(WebSecurity web) throws Exception
	{
		web.ignoring().antMatchers("/css/**", "image/**", "js/**", "/fonts/**", "lib/**");
	}

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http 
                .cors().disable()		//cors 방지
                .csrf().disable()   	//csrf 공격방지
                .headers().frameOptions().disable()
             .and()
            // //  .formLogin().disable();
                .authorizeRequests() 
                // .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/").permitAll()  //누구나 접근 가능한 페이지 
             .and()
                .formLogin() // 로그인에 대한 설정 	
                .loginPage("/login")
                .usernameParameter("email")
                .loginProcessingUrl("/login") // login 주소가 호출 되면 시큐리티가 대신 로그인 진행 
                .defaultSuccessUrl("/") 
             .and()
                .logout()
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true); // 로그아웃시 저장해 둔 세션 날리기 
                
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // 로그인 시 필요한 정보 가져다 줌 
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authDetailsService)
        .passwordEncoder(new BCryptPasswordEncoder());
    }

    // @Override
    // public void configure(WebSecurity web) throws Exception {
    //     web.ignoring()
    //             .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    // }
    
}
