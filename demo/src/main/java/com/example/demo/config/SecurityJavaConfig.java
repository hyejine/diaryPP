package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import com.example.demo.config.jwt.JwtAccessDeniedHandler;
import com.example.demo.config.jwt.JwtAuthenticationEntryPoint;
import com.example.demo.config.jwt.JwtProvier;
import com.example.demo.config.jwt.JwtSecurityConfig;

@Configuration         // Bean 관리 
@EnableWebSecurity     // Spirng Security 보안 설정 활성화 (사이트 전체가 잠김 상태)
// @EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityJavaConfig {

    private final JwtProvier jwtProvier;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityJavaConfig(
            JwtProvier jwtProvier,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAccessDeniedHandler jwtAccessDeniedHandler
    ) {
        this.jwtProvier = jwtProvier;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Override
    // public void configure(WebSecurity web) throws Exception {
    // web .ignoring()
    //     .antMatchers("favicon.ico");
    //         // .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    // }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
            
            .and()
            .csrf().disable()
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)  // 인증 실패 
            .accessDeniedHandler(jwtAccessDeniedHandler)  //인가 실패 

            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // session을 사용하지 않음

            .and()
            .authorizeRequests()   // 접근 제한 설정 
            .antMatchers(
            "/auth/login**",
                            "/auth/signUp**",
                            "/emoji/**",
                            "/emoji/getEmojiList**"
                            // "/auth/hello**"
            ).permitAll()  // 인증없이 접근 허용 
        .anyRequest().authenticated() // 나머지는 인증 받아야 함

        .and()
        .apply(new JwtSecurityConfig(jwtProvier));
        return http.build();

        // http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        // .addFilter(corsFilter)  // 모든 요청은 이 필터를 거침 => 내 서버는 cors정책에서 벗어날 수 있음 
        // .formLogin().disable()  // security에서 제공하는 formLogin사용 안함
        // .httpBasic().disable();  // Bearer방식의 토큰으로 ID/PW 전달 하기 위해 사용 안함 
    } 

    // 사용자 요청 정보로 UserPasswordAuthenticationToken 발급하는 필터
    // @Bean
    // public JwtAuthenticationFilter authenticationFilter() throws Exception {
    //     JwtAuthenticationFilter customAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager());
    //     // 필터 URL 설정
    //     customAuthenticationFilter.setFilterProcessesUrl("/login");
    //     // 인증 성공 핸들러
    //     // customAuthenticationFilter.setAuthenticationSuccessHandler(authSuccessHandler);
    //     // 인증 실패 핸들러
    //     customAuthenticationFilter.setAuthenticationFailureHandler(authFailureHandler);
    //     // BeanFactory에 의해 모든 property가 설정되고 난 뒤 실행
    //     customAuthenticationFilter.afterPropertiesSet();
    //     return customAuthenticationFilter;
    // }


    // JWT의 인증 및 권한을 확인하는 필터
    // @Override
    // @Bean
    // public AuthenticationManager authenticationManagerBean() throws Exception {
    //     return super.authenticationManagerBean();
    // }
    // @Bean
    // public JwtAuthorizationFilter jwtFilter() {
    //     return new JwtAuthorizationFilter(jwtTokenUtil, null);
    // }
    // 로그인 시 필요한 정보 가져다 줌 
    // @Override
    // public void configure(AuthenticationManagerBuilder auth) throws Exception {
    //     auth.userDetailsService(jwtUserDetailsService)
    //     .passwordEncoder(new BCryptPasswordEncoder());
    // }

        // JWT의 인증 및 권한을 확인하는 필터
        // @Bean
        // @Override
        // public AuthenticationManager authenticationManagerBean() throws Exception {
        //     return super.authenticationManagerBean();
        // }
}
