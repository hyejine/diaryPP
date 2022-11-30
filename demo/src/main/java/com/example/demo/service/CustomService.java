package com.example.demo.service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.BoardMapper;
import com.example.demo.model.dao.CustomMapper;
import com.example.demo.model.entity.CustomEntity;
import com.example.demo.model.entity.DiaryDto;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.interfaces.ICustomService;

@Service
public class CustomService implements ICustomService {

    private final CustomMapper customMapper;
    private final BoardMapper boardMapper;

    @Autowired
    public CustomService(CustomMapper customMapper, BoardMapper boardMapper) {
        this.customMapper = customMapper;
        this.boardMapper = boardMapper;
    }

    @Override
    public void postFont(CustomEntity value) {
        System.out.println("===ServiceVAlue====" + value);
        if (customMapper.findUser(value.getUser_email())) {
            System.out.println("이미 아이디가 있는 경우 ");
            value.setCustom_font(value.getCustom_font());
            customMapper.updateFont(value);

        } else {
            System.out.println("아이디가 없는 경우 ");
            value.setUser_email(value.getUser_email());
            value.setCustom_font(value.getCustom_font());
            customMapper.saveFont(value);
        }
    }

    @Override
    public CustomEntity getUserCustom(String email) {
        System.out.println("===ServiceVAlue====" + email);
        return customMapper.getUserCustom(email);

    }
}
