package com.example.demo.model.dao;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.UserDto;


@Repository
@Mapper
public interface UserMapper {
    // public void safeUser(Member value);

    public void registUser(UserDto value);

    Optional<UserDto> getUserEmail(String userEmail);
    // public List<Member> getUserId(String id);
    // public Member findById(String email);


}
