package com.example.demo.model.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.AuthUserDto;
import com.example.demo.model.dto.userDto;

@Repository
@Mapper
public interface AuthMapper {
    
    Optional<AuthUserDto> getId(String email);

    Optional<AuthUserDto> findById(Integer id);


}
