package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.example.demo.jwt.JwtAccessDeniedHandler;
import com.example.demo.jwt.JwtAuthenticationEntryPoint;
import com.example.demo.jwt.JwtProvier;

@Configuration // Bean
@EnableWebSecurity // Spirng Security Web 보안을 활성화해주는 annotation
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityJavaConfig {

    private final JwtProvier jwtProvier;
    private final CorsFilter corsFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityJavaConfig(JwtProvier jwtProvier, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAccessDeniedHandler jwtAccessDeniedHandler, CorsFilter corsFilter) {
        this.jwtProvier = jwtProvier;
        this.corsFilter = corsFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())

                .and()
                .csrf().disable()
                // .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // session사용 안함

                .and()
                .authorizeRequests() // HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정
                .antMatchers(
                        "/user/login**",
                        "/auth/signUp**",
                        "/user/tokenApi/**",
                        "/user/getId/**",
                        "/user/resetPw/**",
                        "/emoji/**",
                        "/board/**",
                        "/custom/**",
                        "/faq/**",
                        "/mail/**")
                .permitAll() // 여기 요청은 접근 허용
                .anyRequest().authenticated() // 나머지 요청들은 모두 인증

                .and()
                .apply(new JwtSecurityConfig(jwtProvier));
        return http.build();
    }

    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setDefaultEncoding("UTF-8"); // ���� ���ڵ� ����
        // multipartResolver.setMaxUploadSizePerFile(5 * 1024 * 1024); // ���ϴ� ���ε�
        // ũ�� ���� (5MB)
        return multipartResolver;
    }
}
