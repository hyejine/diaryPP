package com.example.demo.model.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.UserEntity;

@Repository
@Mapper
public interface AccountRepository {

    public boolean existsByEmail(String email);

    public UserEntity save(UserEntity account);
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findById(Long currentMemberId);
    
}
