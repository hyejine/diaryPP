package com.example.demo.model.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.UserDto;

@Repository
@Mapper
public interface AccountRepository {

    public boolean existsByEmail(String email);

    public UserDto save(UserDto account);
    Optional<UserDto> findByEmail(String email);
    Optional<UserDto> findById(Long currentMemberId);
    
}
