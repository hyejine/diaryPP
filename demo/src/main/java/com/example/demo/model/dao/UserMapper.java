package com.example.demo.model.dao;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.UserRequestDto;
import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.model.entity.UserEntity;

@Repository
@Mapper
public interface UserMapper {
    // public void safeUser(Member value);

    boolean existsByEmail(String email);

    public void signUp(UserEntity user);

    public UserRequestDto registUser(UserEntity value);

    Optional<UserEntity> findByUserEmail(String userEmail);

    Optional<UserEntity> getUserEmail(String userEmail);

    public List<UserEntity> getUserId(String id);

    Optional<UserEntity> findById(String optional);

    public int resetPw(UserEntity data);
}
