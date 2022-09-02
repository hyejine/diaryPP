package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.example.demo.config.jwt.JwtAuthenticationFilter;
import com.example.demo.service.auth.AuthDetailsService;

import lombok.RequiredArgsConstructor;


// import com.example.demo.service.auth.AuthDetailsService;

@Configuration         // Bean 관리 
@EnableWebSecurity     // Spirng Security 설정 활성화 (사이트 전체가 잠김 상태)
@RequiredArgsConstructor
// @EnableGlobalMethodSecurity(prePostEnabled = true)
// @Component

public class SecurityJavaConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter; 
    // private final JwtTokenUtil tokenProvider;
    // private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    // private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // session을 사용하지 않음
        .and()
        .addFilter(corsFilter)  // 모든 요청은 이 필터를 거침 => 내 서버는 cors정책에서 벗어날 수 있음 
        .formLogin().disable()  // security에서 제공하는 formLogin사용 안함
        .httpBasic().disable()  // Bearer방식의 토큰으로 ID/PW 전달 하기 위해 사용 안함 
        .addFilter(new JwtAuthenticationFilter(authenticationManager()))
        .authorizeRequests()
        .antMatchers("/api/vi/user/**")  // 이쪽으로 주소가 들어오면 
        .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")  // access를 ROLE_USE라고 해줌 
        .antMatchers("/api/vi/admin/**")  
        .access("hasRole('ROLE_ADMIN')")
        .anyRequest().permitAll(); // 다른 요청은 거부 없이 들어갈 수 있다. 
    } 
    // 로그인 시 필요한 정보 가져다 줌 
    // @Override
    // public void configure(AuthenticationManagerBuilder auth) throws Exception {
    //     auth.userDetailsService(jwtUserDetailsService)
    //     .passwordEncoder(new BCryptPasswordEncoder());
    // }

    // @Bean
    // @Override
    // public AuthenticationManager authenticationManagerBean() throws Exception {
    //     return super.authenticationManagerBean();
    // }

    // @Bean
    // protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http
    //     .httpBasic().disable()
    //     .csrf().disable()
    //     .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

    //     .and()
    //     .exceptionHandling()
    //     .authenticationEntryPoint(jwtAuthenticationEntryPoint)
    //     // .accessDeniedHandler(jwtAccessDeniedHandler)

    //     .and()
    //     .authorizeRequests()
    //     .antMatchers("/auth/**").permitAll()
    //     .anyRequest().authenticated()

    //     .and()
    //     .apply(new JwtSecurityConfig(tokenProvider));
    //     return http.build();

// return http.build();

        // httpSecurity.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        // httpSecurity.csrf().disable()
        //         // 특정 API는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정.
        //         .authorizeRequests().antMatchers("/member/*").permitAll()
        //         .antMatchers("/**").permitAll()
        //         .anyRequest().authenticated()
        //     .and()
        //         // exception handling 할 때 우리가 만든 클래스를 추가
        //         .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
        //         .accessDeniedHandler(jwtAccessDeniedHandler)
        //         // 시큐리티는 기본적으로 세션을 사용하지만, 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정.
        //     .and()
        //          .sessionManagement()
        //          .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        
        // http 
        //         .cors()
        //         .configurationSource(corsConfigurationSource())
        //         // .disable()		//cors 방지
        //     .and()
        //         .csrf().disable()   	//csrf 공격방지
        //         .headers().frameOptions().disable()
        //     .and()
        //         .authorizeRequests() 
        //         // .antMatchers("/user/**").authenticated()
        //         // .antMatchers("/admin/**").access("hasRole('admin')")
        //         .anyRequest().permitAll()
        //     //     .antMatchers("/").permitAll()  //누구나 접근 가능한 페이지 
        //      .and()
        //         .formLogin().disable() // 로그인에 대한 설정 
        //         .httpBasic().disable()	;
                // .loginPage("/user/login")
                // .usernameParameter("email")
                // .loginProcessingUrl("/login") // login 주소가 호출 되면 시큐리티가 대신 로그인 진행 
                // .defaultSuccessUrl("/") 
            //  .and()
            //     .logout()
            //     .logoutSuccessUrl("/")
            //     .invalidateHttpSession(true); // 로그아웃시 저장해 둔 세션 날리기 
                
    // }
}
