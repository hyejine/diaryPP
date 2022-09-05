package com.example.demo.config.auth;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.dao.UserRepository;
import com.example.demo.model.dto.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
//DB에서 UserDetail를 얻어와 AuthenticationManager에게 제공하는 역할
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("UserDetailsService: 아이디 확인중");
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        // return PrincipalDetails.build(user);
        return new PrincipalDetails(
            user.getUser_password(),
            user.getUser_email(),
            Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
    );
    }
    
}
