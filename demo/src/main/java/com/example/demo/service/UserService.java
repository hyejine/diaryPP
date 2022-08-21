package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dao.UserMapper;
import com.example.demo.model.dto.userDto;

@Service
public class UserService {

    @Autowired
    public UserMapper userMapper;

    public void safeUser(userDto value){
        userMapper.safeUser(value);
    }
    
}
