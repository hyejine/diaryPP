package com.example.demo.model.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.TokenDto;
import com.example.demo.model.dto.userDto;

@Repository
@Mapper
public interface AuthMapper {
    // findById
    Optional<userDto> findByEmail(String email);
    boolean existsByEmail(String email);
    userDto save(userDto memberuserDto);
    Optional<userDto> findById(Long currentMemberId);


}
