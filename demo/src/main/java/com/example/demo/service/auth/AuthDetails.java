package com.example.demo.service.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.model.dto.userDto;

public class AuthDetails implements UserDetails{

    private userDto user;

    public AuthDetails(userDto user){
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    
		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(new GrantedAuthority() {
			
			@Override
			public String getAuthority() {
				return user.getUser_type();
			}
		});
		return collect;
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
