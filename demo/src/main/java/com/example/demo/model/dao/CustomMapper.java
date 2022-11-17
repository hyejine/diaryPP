package com.example.demo.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.CustomDto;

@Repository
@Mapper
public interface CustomMapper {
    
    public boolean getUserCustom(String currentUser);

    public void updateFont(CustomDto value);

    public void saveFont(CustomDto value);


}
