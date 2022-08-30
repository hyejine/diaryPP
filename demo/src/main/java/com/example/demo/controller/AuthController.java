package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<UserResponseDto> getUserInfo(String email){
        return ResponseEntity.ok(authService.getMyInfo(email));
    }
    @GetMapping("/{email}")
    public ResponseEntity<UserResponseDto> getMemberInfo(@PathVariable String email) {
        return ResponseEntity.ok(authService.getMemberInfo(email));
    }
}
