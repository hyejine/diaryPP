package com.example.demo.model.dao;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.UserEntity;


@Repository
@Mapper
public interface UserMapper {
    // public void safeUser(Member value);

    public void registUser(UserEntity value);

    Optional<UserEntity> findByUserEmail(String userEmail);

    Optional<UserEntity> getUserEmail(String userEmail);
    // public List<Member> getUserId(String id);
    // public Member findById(String email);


}
