package com.example.demo.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.CustomEntity;

@Repository
@Mapper
public interface CustomMapper {

    public boolean findUser(String currentUser);

    public void updateFont(CustomEntity value);

    public void saveFont(CustomEntity value);

    public CustomEntity getUserCustom(String email);

}
