package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.example.demo.config.jwt.JwtAccessDeniedHandler;
import com.example.demo.config.jwt.JwtAuthenticationEntryPoint;
import com.example.demo.config.jwt.JwtProvier;
import com.example.demo.config.jwt.JwtSecurityConfig;

@Configuration         // Bean ���� 
@EnableWebSecurity     // Spirng Security ���� ���� Ȱ��ȭ (����Ʈ ��ü�� ��� ����)
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
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)  // ���� ���� 
            .accessDeniedHandler(jwtAccessDeniedHandler)  //�ΰ� ���� 

            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // session�� ������� ����

            .and()
            .authorizeRequests()   // ���� ���� ���� 
            .antMatchers(
            "/auth/login**",
                            "/auth/signUp**",
                            "/emoji/**",
                            "/emoji/getEmojiList**",
                            "/board/**", 
                            "/custom/**",
                            "/mail/**"
                            // "/auth/hello**"
            ).permitAll()  // �������� ���� ��� 
        .anyRequest().authenticated() // �������� ���� �޾ƾ� ��

        .and()
        .apply(new JwtSecurityConfig(jwtProvier));
        return http.build();

        // http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        // .addFilter(corsFilter)  // ��� ��û�� �� ���͸� ��ħ => �� ������ cors��å���� ��� �� ���� 
        // .formLogin().disable()  // security���� �����ϴ� formLogin��� ����
        // .httpBasic().disable();  // Bearer����� ��ū���� ID/PW ���� �ϱ� ���� ��� ���� 
    } 
    @Bean
public CommonsMultipartResolver multipartResolver() {
    CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
    multipartResolver.setDefaultEncoding("UTF-8"); // ���� ���ڵ� ����
    // multipartResolver.setMaxUploadSizePerFile(5 * 1024 * 1024); // ���ϴ� ���ε� ũ�� ���� (5MB)
    return multipartResolver;
}

// @Bean
// public JavaMailSenderImpl mailSender() {
//     JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

//     javaMailSender.setProtocol("smtp");
//     javaMailSender.setHost("127.0.0.1");
//     javaMailSender.setPort(25);

//     return javaMailSender;
// }


    // ����� ��û ������ UserPasswordAuthenticationToken �߱��ϴ� ����
    // @Bean
    // public JwtAuthenticationFilter authenticationFilter() throws Exception {
    //     JwtAuthenticationFilter customAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager());
    //     // ���� URL ����
    //     customAuthenticationFilter.setFilterProcessesUrl("/login");
    //     // ���� ���� �ڵ鷯
    //     // customAuthenticationFilter.setAuthenticationSuccessHandler(authSuccessHandler);
    //     // ���� ���� �ڵ鷯
    //     customAuthenticationFilter.setAuthenticationFailureHandler(authFailureHandler);
    //     // BeanFactory�� ���� ��� property�� �����ǰ� �� �� ����
    //     customAuthenticationFilter.afterPropertiesSet();
    //     return customAuthenticationFilter;
    // }


    // JWT�� ���� �� ������ Ȯ���ϴ� ����
    // @Override
    // @Bean
    // public AuthenticationManager authenticationManagerBean() throws Exception {
    //     return super.authenticationManagerBean();
    // }
    // @Bean
    // public JwtAuthorizationFilter jwtFilter() {
    //     return new JwtAuthorizationFilter(jwtTokenUtil, null);
    // }
    // �α��� �� �ʿ��� ���� ������ �� 
    // @Override
    // public void configure(AuthenticationManagerBuilder auth) throws Exception {
    //     auth.userDetailsService(jwtUserDetailsService)
    //     .passwordEncoder(new BCryptPasswordEncoder());
    // }

        // JWT�� ���� �� ������ Ȯ���ϴ� ����
        // @Bean
        // @Override
        // public AuthenticationManager authenticationManagerBean() throws Exception {
        //     return super.authenticationManagerBean();
        // }
}
