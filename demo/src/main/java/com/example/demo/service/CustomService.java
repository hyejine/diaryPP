package com.example.demo.service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.BoardMapper;
import com.example.demo.model.dao.CustomMapper;
import com.example.demo.model.dto.CustomDto;
import com.example.demo.model.dto.DiaryDto;
import com.example.demo.model.dto.UserDto;
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
    public CustomDto postFont(CustomDto value) {
        // User currentUser = userService.getCurrentUser();

        String currentUser = "f";
        
        if(customMapper.getUserCustom(currentUser)){
            System.out.println("=====currentUser====="+currentUser);
            System.out.println("=====currentUser2====="+customMapper.getUserCustom(currentUser));

            value.setCustom_font(value.getCustom_font());
            return customMapper.updateFont(value, currentUser);

        } else {
            value.setUser_email(currentUser);
            value.setCustom_font(value.getCustom_font());
            return customMapper.saveFont(value);
        }
    }
}
