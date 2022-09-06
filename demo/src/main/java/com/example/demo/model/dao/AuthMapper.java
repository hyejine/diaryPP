package com.example.demo.model.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.User;

@Repository
@Mapper
public interface AuthMapper {
    Optional<User> findByEmail(String username);
    // boolean existsByEmail(String email);
    // User save(User memberuserDto);
    // Optional<User> findById(Long currentMemberId);


}
