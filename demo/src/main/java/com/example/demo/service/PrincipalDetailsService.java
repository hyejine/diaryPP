package com.example.demo.service;

import com.example.demo.model.dto.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.AuthMapper;

import java.util.Collections;

@Service
//DB에서 UserDetail를 얻어와 AuthenticationManager에게 제공하는 역할
public class PrincipalDetailsService implements UserDetailsService {

    private final AuthMapper authMapper;

    public PrincipalDetailsService(AuthMapper authMapper) {
       this.authMapper = authMapper;
    }
    
    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) {
       return authMapper.findByEmail(username)
          .map(user -> createUser(username, user))
          .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    private org.springframework.security.core.userdetails.User createUser(String username, User user) {
        if (!user.isUser_activated()) {
           throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
        }
        // List<GrantedAuthority> grantedAuthorities = user.getUser_type().stream()
        //         .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
        //         .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getUser_email(),
                user.getUser_password(),
                Collections.singleton(new SimpleGrantedAuthority(user.getUser_type())));
     }

    
    // @Override
    // @Transactional
    // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    
    //     System.out.println("UserDetailsService: 아이디 확인중"+username);
    //     User user = authMapper.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    //     System.out.println(user);
    //     return new PrincipalDetails(
    //         user.getUser_email(),
    //         user.getUser_password(),
    //         Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
    //         );
    // }
    
}
