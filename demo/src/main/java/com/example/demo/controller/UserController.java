package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.security.LoginRequestDto;
import com.example.demo.model.entity.TokenEntity;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.UserService;


@RestController
@RequestMapping("/user")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    // @Autowired
    // public UserService userService;


    // @PostMapping("/safeUser")
    // public void safeUser(@RequestBody Member value){
    //     userService.safeUser(value);
    // }

    @PostMapping("/signUp")
    public void registUser(@RequestBody UserEntity userEntity){
        userService.registUser(userEntity);
    }

    @PostMapping("/login")
    public TokenEntity login(@RequestBody LoginRequestDto memberLoginRequestDto) {
        System.out.println("1. LoginRequestDto " + memberLoginRequestDto);
        String email = memberLoginRequestDto.getUser_email();
        String password = memberLoginRequestDto.getUser_password();
        TokenEntity tokenInfo = userService.login(email, password);
        return tokenInfo;
    }

    @GetMapping("/postFont/{fontChange}")
	public String postFont(@PathVariable ("fontChange") String data) {
		System.out.println("======value===="+data);
		// customService.postFont(data);
		return "data"+data;
	}

    @GetMapping("/getId/{userId}")
    public List<UserEntity> getUserId (@PathVariable("userId") String id){
        return userService.getUserId(id);
    }
}
