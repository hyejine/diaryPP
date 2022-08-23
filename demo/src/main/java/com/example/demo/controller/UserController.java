package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.userDto;
import com.example.demo.service.UserService;

@RestController

public class UserController {
    
    @Autowired
    public UserService userService;

    @PostMapping("user/safeUser")
    public void safeUser(@RequestBody userDto value){
        userService.safeUser(value);
    }

    @PostMapping("user/regist")
    public void registUser(@RequestBody userDto value){
        userService.registUser(value);
    }
}
