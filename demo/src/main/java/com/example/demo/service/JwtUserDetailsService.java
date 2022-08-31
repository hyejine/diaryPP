package com.example.demo.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.dao.AuthMapper;
import com.example.demo.model.dao.UserMapper;
import com.example.demo.model.dto.userDto;

@Service
public class JwtUserDetailsService implements UserDetailsService{
    
    @Autowired UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        userDto user = userMapper.findById(username);
        System.out.println("userLoginRes: "+user);

        if (user != null) {
            return new userDto(user.getId(), user.getUser_email(), user.getUser_password(),
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
