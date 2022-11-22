package com.example.demo.model.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.UserEntity;

@Repository
@Mapper
public interface AuthMapper {
    Optional<UserEntity> findByEmail(String username);
}
