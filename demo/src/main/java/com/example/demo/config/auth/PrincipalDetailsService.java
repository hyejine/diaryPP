package com.example.demo.config.auth;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.AuthMapper;
import com.example.demo.model.dto.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
//DB에서 UserDetail를 얻어와 AuthenticationManager에게 제공하는 역할
public class PrincipalDetailsService implements UserDetailsService {

    private final AuthMapper authMapper;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    
        System.out.println("UserDetailsService: 아이디 확인중"+username);
        User user = authMapper.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        System.out.println(user);
        return new PrincipalDetails(
            user.getUser_email(),
            user.getUser_password(),
            Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            );
    }
    
}
