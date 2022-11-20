package com.example.demo.service.interfaces;

import java.util.List;

import com.example.demo.model.entity.TokenEntity;
import com.example.demo.model.entity.UserEntity;

public interface IUserService {

    public void registUser(UserEntity value);

    public List<UserEntity> getUserId(String id);

    public TokenEntity login(String email, String password);
}
