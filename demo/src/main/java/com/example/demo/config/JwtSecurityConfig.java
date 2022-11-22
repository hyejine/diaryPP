package com.example.demo.config;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.jwt.JwtFilter;
import com.example.demo.jwt.JwtProvier;

// JwtProvier, JwtFilter를 SecurityConfig에 적용할때 사용할 JwtSecurityConfig 클래스 추가
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity>{
    
    private JwtProvier jwtProvier;

    public JwtSecurityConfig(JwtProvier jwtProvier) {
        this.jwtProvier = jwtProvier;
    }

    @Override
    public void configure(HttpSecurity http) {
        JwtFilter customFilter = new JwtFilter(jwtProvier);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}

