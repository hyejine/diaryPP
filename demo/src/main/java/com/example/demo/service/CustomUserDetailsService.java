package com.example.demo.service;

import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.AuthMapper;
import com.example.demo.model.dto.UserDto;

import lombok.RequiredArgsConstructor;

@Service
// @RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AuthMapper authMapper;

    public CustomUserDetailsService(AuthMapper authMapper) {
        this.authMapper = authMapper;
    }

    @Override
    @Transactional
    // 로그인시에 DB에서 유저정보와 권한정보 가져오게함
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("3. CustomUserDetailsService의 username"+username);
        return authMapper.findByEmail(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    // DB 에 User 값이 존재한다면 UserDetails 객체로 만들어서 리턴
    private UserDetails createUserDetails(UserDto user) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getUser_type().toString());
        System.out.println("3. grantedAuthority"+ grantedAuthority);
        return new User(
                String.valueOf(user.getId()),
                user.getUser_password(),
                Collections.singleton(grantedAuthority)
        );
    }
}