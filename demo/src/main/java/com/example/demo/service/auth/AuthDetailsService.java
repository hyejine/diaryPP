package com.example.demo.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.dao.AuthMapper;
import com.example.demo.model.dto.userDto;

@Service
public class AuthDetailsService implements UserDetailsService{

    @Autowired
    private AuthMapper authMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        userDto userEntity = authMapper.getId(email);
        if(userEntity != null){
            return new AuthDetails(userEntity);
        }
        return (UserDetails) new UsernameNotFoundException(email);
    }
    
}
