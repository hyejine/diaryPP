package com.example.demo.model.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.auth.RefreshToken;

@Repository
@Mapper
public interface RefreshTokenRepository {

    public void save(RefreshToken refreshToken);

    Optional<RefreshToken> findByKey(String name);
    
}
