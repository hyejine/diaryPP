package com.example.demo.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.CustomDto;

@Repository
@Mapper
public interface CustomMapper {
    
    public boolean getUserCustom(String currentUser);

    public CustomDto updateFont(CustomDto value, String currentUser);

    public CustomDto saveFont(CustomDto value);


}
