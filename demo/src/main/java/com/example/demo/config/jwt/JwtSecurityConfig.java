package com.example.demo.config.jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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

