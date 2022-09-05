// package com.example.demo.config.auth;

// import java.util.Collections;

// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.example.demo.model.dao.UserRepository;
// import com.example.demo.model.dto.User;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class PrincipalDetailsService implements UserDetailsService {

//     // private final UserRepository userRepository;

//     @Override
//     public UserDetails loadUserByUsername(String username) {
//         System.out.println("UserDetailsService");
//         User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("Not Found User"));
//         return new PrincipalDetails(
//             user.getUser_password(),
//             user.getUser_email(),
//             Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
//     );
//     }
    
// }
