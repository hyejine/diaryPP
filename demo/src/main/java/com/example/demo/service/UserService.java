package com.example.demo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.jwt.JwtProvier;
import com.example.demo.model.dao.CustomMapper;
import com.example.demo.model.dao.UserMapper;
import com.example.demo.model.dto.UserRequestDto;
import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.model.dto.UserType;
import com.example.demo.model.entity.CustomEntity;
import com.example.demo.model.entity.TokenEntity;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.interfaces.IUserService;
import com.example.demo.util.SecurityUtil;

@Service
public class UserService implements IUserService {
    private PasswordEncoder passwordEncoder;
    private UserMapper userMapper;
    private JwtProvier jwtProvier;
    private AuthenticationManagerBuilder authenticationManagerBuilder;
    private CustomMapper customMapper;

    @Autowired
    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder, JwtProvier jwtProvier,
            AuthenticationManagerBuilder authenticationManagerBuilder, CustomMapper customMapper) {
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.jwtProvier = jwtProvier;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.customMapper = customMapper;

    }

    // @Override
    // @Transactional
    // public UserRequestDto registUser(UserRequestDto requestDto) {

    // UserEntity user = requestDto.toMember(passwordEncoder);
    // return UserRequestDto.of(userMapper.registUser(user));
    // }

    @Override
    public List<UserEntity> getUserId(String id) {
        return userMapper.getUserId(id);
    }

    @Transactional
    public TokenEntity login(UserRequestDto userRequestDto) {
        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = userRequestDto.toAuthentication();

        System.out.println("2. authenticationToken" + authenticationToken);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername
        // 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        System.out.println("5.authentication" + authentication);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenEntity tokenInfo = jwtProvier.createToken(authentication);
        System.out.println("6.tokenInfo" + tokenInfo);

        return tokenInfo;
    }

    @Transactional(readOnly = true)
    public UserResponseDto getAuthorization() {
        UserResponseDto user = userMapper.findById(SecurityUtil.getCurrentUserId())
                .map(UserResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        return user;
    }

    @Transactional
    public int resetPw(UserEntity data) {
        System.out.println(data);
        data.setUser_password(passwordEncoder.encode(data.getUser_password()));
        int success = userMapper.resetPw(data);
        return success;
    }

    @Override
    public void registUser(UserEntity value) {
        // TODO Auto-generated method stub

    }

}
