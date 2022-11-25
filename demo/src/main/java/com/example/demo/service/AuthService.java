package com.example.demo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.UserMapper;
import com.example.demo.model.dto.UserRequestDto;
import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.interfaces.IAuthService;

@Service
@Transactional
public class AuthService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public void signUp(UserRequestDto requestDto) {
        if (userMapper.existsByEmail(requestDto.getUser_email())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        UserEntity user = requestDto.toMember(passwordEncoder);
        userMapper.signUp(user);
    }

}
