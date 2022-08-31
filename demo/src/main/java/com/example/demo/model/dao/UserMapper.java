package com.example.demo.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.userDto;

@Repository
@Mapper
public interface UserMapper {
    public void safeUser(userDto value);

    public void registUser(userDto value);

    public List<userDto> getUserId(String id);
    public userDto findById(String email);


}
