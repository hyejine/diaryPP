package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.userDto;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/user")

public class UserController {
    
    @Autowired
    public UserService userService;

    @PostMapping("/safeUser")
    public void safeUser(@RequestBody userDto value){
        userService.safeUser(value);
    }

    @PostMapping("/regist")
    public void registUser(@RequestBody userDto value){
        userService.registUser(value);
    }

    @GetMapping("/getId/{userId}")
    public List<userDto> getUserId (@PathVariable("userId") String id){
        return userService.getUserId(id);
    }
}
