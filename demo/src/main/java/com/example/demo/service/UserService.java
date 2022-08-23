package com.example.demo.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.UserMapper;
import com.example.demo.model.dto.userDto;

@Service
@Transactional(readOnly = true)
public class UserService implements UserMapper{
    // private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserMapper userMapper;

    @Autowired
    public UserService ( UserMapper userMapper){
        // this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userMapper = userMapper;
    }

    @Override
    public void safeUser(userDto value){
        userMapper.safeUser(value);
    }

    @Override
    @Transactional
    public void registUser(userDto value){
        Date date = new Date();

        String passwordHashed = BCrypt.hashpw(value.getUser_password(), BCrypt.gensalt(10));
        boolean isValidPassword = BCrypt.checkpw(value.getUser_password(), passwordHashed);
        // String encodePwd = bCryptPasswordEncoder.encode(value.getUser_password());
        System.out.println(passwordHashed+"isValidP{assword"+isValidPassword);

        value.setUser_create(date);
        userMapper.registUser(value);
    }
    
}
