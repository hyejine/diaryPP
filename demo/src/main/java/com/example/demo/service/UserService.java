package com.example.demo.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.crypto.bcrypt.BCrypt;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.UserMapper;
import com.example.demo.model.dto.UserType;
import com.example.demo.model.dto.userDto;

@Service
@Transactional
public class UserService implements UserMapper{
    private PasswordEncoder passwordEncoder;
    private UserMapper userMapper;

    @Autowired
    public UserService ( UserMapper userMapper, PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
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
        value.setUser_password(passwordEncoder.encode(value.getUser_password()));
        value.setUser_create(date);
        value.setUser_type("User");
        userMapper.registUser(value);
    }

    @Override
    public List<userDto> getUserId(String id){
        return userMapper.getUserId(id);
    }

    // @Override
    // public userDto getId(String email) {
    //     // TODO Auto-generated method stub
    //     return null;
    // }
    
}
