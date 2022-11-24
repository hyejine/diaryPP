package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.model.dao.UserMapper;
import com.example.demo.model.dto.UserRequestDto;
import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.interfaces.IAuthService;

@Service
public class AuthService implements IAuthService {

    private final UserMapper userMapper;

    public AuthService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public UserResponseDto signUp(UserRequestDto requestDto) {
        if (userMapper.existsByEmail(requestDto.getUser_email())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        UserEntity member = requestDto.toMember(passwordEncoder);
        return UserResponseDto.of(userMapper.signUp(member));
    }

}
