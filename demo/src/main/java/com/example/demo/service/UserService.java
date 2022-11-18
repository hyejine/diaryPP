package com.example.demo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.UserMapper;
import com.example.demo.model.dto.UserType;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.interfaces.IUserService;

@Service
public class UserService implements IUserService{
    private PasswordEncoder passwordEncoder;
    private UserMapper userMapper;

    @Autowired
    public UserService ( UserMapper userMapper, PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
    public void registUser(UserEntity value){

        // if(userMapper.findByUserEmail(value.getUser_email()).orElse(null) != null){
        //     System.out.println("이미 가입된 곳에 들어옴");
        //     throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        // }

        Date date = new Date();
        UserEntity userEntity = new UserEntity();
        userEntity.setUser_name(value.getUser_name());
        userEntity.setUser_email(value.getUser_email());
        userEntity.setUser_password(passwordEncoder.encode(value.getUser_password()));
        userEntity.setUser_create(date);
        userEntity.setUser_type("ROLE_USER");
        userEntity.setSns_type(value.getSns_type());
        userMapper.registUser(userEntity);
    }

    @Override
    public List<UserEntity> getUserId(String id){
        return userMapper.getUserId(id);
    }
    // @Override
    // public Optional<UserEntity> getUserEmail(String userEmail) {
    //     // TODO Auto-generated method stub
    //     return Optional.empty();
    // }


//     // @Override
//     // public userDto getId(String email) {
//     //     // TODO Auto-generated method stub
//     //     return null;
//     // }
    
}
