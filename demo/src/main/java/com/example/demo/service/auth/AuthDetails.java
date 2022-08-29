package com.example.demo.service.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.model.dto.userDto;

public class AuthDetails implements UserDetails{

    private userDto user;

    public AuthDetails(userDto user){
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    
        Set<GrantedAuthority> roles = new HashSet<>();
        for (String role : user.getUser_type().split(",")) {
         roles.add(new SimpleGrantedAuthority(role));
    }
    return roles;
  }

    @Override
    public String getPassword() {
        return user.getUser_password();
    }

    @Override
    public String getUsername() {
        return user.getUser_email();
    }

    // 계정 만료 여부 
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정 잠김 여부 
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호 만료 여부 
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정 활성화 여부
    @Override
    public boolean isEnabled() {
        return true;
    }
    
}
