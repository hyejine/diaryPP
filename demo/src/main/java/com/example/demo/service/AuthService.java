package com.example.demo.service;

import org.apache.catalina.security.SecurityUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.AuthMapper;
import com.example.demo.model.dto.UserResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthMapper authMapper;

    @Transactional(readOnly = true)
    public UserResponseDto getMemberInfo(String email){
        return authMapper.getId(email)
                .map(UserResponseDto::of)
                .orElseThrow(()->new RuntimeException("유저정보가 없습니다"));
    }

    // 현재 SecurityContext 에 있는 유저 정보 가져오기
    @Transactional(readOnly = true)
    public UserResponseDto getMyInfo() {
        return authMapper.findById(SecurityUtil.getCurrentMemberId())
                .map(UserResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }
}
