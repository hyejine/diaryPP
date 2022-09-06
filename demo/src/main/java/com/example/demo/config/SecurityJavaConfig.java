package com.example.demo.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import com.example.demo.config.auth.AuthFailureHandler;
// import com.example.demo.config.auth.AuthSuccessHandler;
import com.example.demo.config.jwt.JwtAccessDeniedHandler;
import com.example.demo.config.jwt.JwtAuthenticationEntryPoint;
import com.example.demo.config.jwt.JwtAuthenticationFilter;
// import com.example.demo.config.jwt.JwtAuthorizationFilter;
// import com.example.demo.config.jwt.JwtTokenUtil;
import com.example.demo.config.jwt.JwtAuthorizationFilter;

import lombok.RequiredArgsConstructor;

@Configuration         // Bean 관리 
@EnableWebSecurity     // Spirng Security 설정 활성화 (사이트 전체가 잠김 상태)
@RequiredArgsConstructor
public class SecurityJavaConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter; 
    // private final JwtTokenUtil jwtTokenUtil;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; // 인증 실패 또는 인증헤더가 전달받지 못했을때 핸들러
    // private final AuthSuccessHandler authSuccessHandler; // 인증 성공 핸들러
    private final AuthFailureHandler authFailureHandler; // 인증 실패 핸들러
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler; // 인가 실패 핸들러
    private final JwtAuthorizationFilter jwtAuthenticationFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
public void configure(WebSecurity web) throws Exception {
    web.ignoring()
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
}

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // session을 사용하지 않음
        .and().exceptionHandling()
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)  // 인증 실패 
        // .accessDeniedHandler(jwtAccessDeniedHandler)  //인가 실패 
        // .addFilter(new JwtAuthenticationFilter(authenticationManager(), null))
        // .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
        .and().authorizeRequests()
        .antMatchers(
            "/auth/**"
            // "/home**"
            ).permitAll()  // 이쪽으로 주소가 들어오면 
        // .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")  // access를 ROLE_USE라고 해줌 
        // .anyRequest().permitAll() // 다른 요청은 거부 없이 들어갈 수 있다. 
        .anyRequest().authenticated() 
        .and()
        .exceptionHandling()
        .and()
        .addFilter(corsFilter)  // 모든 요청은 이 필터를 거침 => 내 서버는 cors정책에서 벗어날 수 있음 
        .formLogin().disable()  // security에서 제공하는 formLogin사용 안함
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .httpBasic().disable();  // Bearer방식의 토큰으로 ID/PW 전달 하기 위해 사용 안함 
    } 

    // 사용자 요청 정보로 UserPasswordAuthenticationToken 발급하는 필터
    @Bean
    public JwtAuthenticationFilter authenticationFilter() throws Exception {
        JwtAuthenticationFilter customAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager());
        // 필터 URL 설정
        customAuthenticationFilter.setFilterProcessesUrl("/login");
        // 인증 성공 핸들러
        // customAuthenticationFilter.setAuthenticationSuccessHandler(authSuccessHandler);
        // 인증 실패 핸들러
        customAuthenticationFilter.setAuthenticationFailureHandler(authFailureHandler);
        // BeanFactory에 의해 모든 property가 설정되고 난 뒤 실행
        customAuthenticationFilter.afterPropertiesSet();
        return customAuthenticationFilter;
    }


    // JWT의 인증 및 권한을 확인하는 필터
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    // @Bean
    // public JwtAuthorizationFilter jwtFilter() {
    //     return new JwtAuthorizationFilter(jwtTokenUtil);
    // }
    // 로그인 시 필요한 정보 가져다 줌 
    // @Override
    // public void configure(AuthenticationManagerBuilder auth) throws Exception {
    //     auth.userDetailsService(jwtUserDetailsService)
    //     .passwordEncoder(new BCryptPasswordEncoder());
    // }
}
