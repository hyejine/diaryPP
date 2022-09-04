package com.example.demo.config.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.model.dto.User;

import lombok.Data;

@Data
public class PrincipalDetails implements UserDetails{

    private User user;

    public PrincipalDetails(User user){
        this.user = user;
    }

    // 해당 user의 권한을 리턴한는 곳
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        user.getRoleList().forEach(r->{
            authorities.add(()->r);
        });
        return authorities;
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
