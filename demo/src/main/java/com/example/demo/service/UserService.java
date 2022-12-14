package com.example.demo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
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
    private UserDetails userdetails;

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
        // 1. Login ID/PW ??? ???????????? Authentication ?????? ??????
        // ?????? authentication ??? ?????? ????????? ???????????? authenticated ?????? false
        UsernamePasswordAuthenticationToken authenticationToken = userRequestDto.toAuthentication();

        System.out.println("2. authenticationToken" + authenticationToken);

        // 2. ?????? ?????? (????????? ???????????? ??????)??? ??????????????? ??????
        // authenticate ???????????? ????????? ??? CustomUserDetailsService ?????? ?????? loadUserByUsername
        // ???????????? ??????
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        System.out.println("5.authentication" + authentication);

        // 3. ?????? ????????? ???????????? JWT ?????? ??????
        TokenEntity tokenInfo = jwtProvier.createToken(authentication);
        System.out.println("6.tokenInfo" + tokenInfo);

        return tokenInfo;
    }

    @Transactional(readOnly = true)
    public UserResponseDto getAuthorization() {
        UserResponseDto user = userMapper.findById(SecurityUtil.getCurrentUserId())
                .map(UserResponseDto::of)
                .orElseThrow(() -> new RuntimeException("????????? ?????? ????????? ????????????"));
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

    @Override
    public String getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userName = auth.getName();
        return userName;
    }

    // @Override
    // public User getCurrentUser() {
    //     SecurityContext securityContext = SecurityContextHolder.getContext();
    //     AuthenticationUser user = (AuthenticationUser) securityContext.getAuthentication().getPrincipal();
    //     return user.getUser();
    // }
    // User user = userService.getCurrentUser();i

}
