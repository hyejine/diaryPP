package com.example.demo.service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.BoardMapper;
import com.example.demo.model.dao.CustomMapper;
import com.example.demo.model.entity.CustomDto;
import com.example.demo.model.entity.DiaryDto;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.interfaces.ICustomService;

@Service
public class CustomService implements ICustomService{
    
    private final CustomMapper customMapper;
    private final BoardMapper boardMapper;

    @Autowired
    public CustomService(CustomMapper customMapper, BoardMapper boardMapper){
        this.customMapper = customMapper;
        this.boardMapper = boardMapper;
    }

    @Override
    public void postFont(CustomDto value) {
        // User currentUser = userService.getCurrentUser();
        String currentUser = "f";
        System.out.println("===ServiceVAlue===="+ value);
        // boolean test = customMapper.getUserCustom(currentUser);
        // System.out.println(test);
        if(customMapper.getUserCustom(currentUser)){
            System.out.println("=====currentUser1====="+currentUser);
            System.out.println("=====currentUser2====="+customMapper.getUserCustom(currentUser));
            value.setUser_email(currentUser);
            value.setCustom_font(value.getCustom_font());

            customMapper.updateFont(value);
            // return customMapper.updateFont(value , currentUser);

            // return;

        } else {
            System.out.println("=====currentUser3====="+currentUser);
            value.setUser_email(currentUser);
            value.setCustom_font(value.getCustom_font());
            
            customMapper.saveFont(value);
            // return customMapper.saveFont(value);
        }
    }
}
