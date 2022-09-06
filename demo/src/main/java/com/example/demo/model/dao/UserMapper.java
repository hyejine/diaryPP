package com.example.demo.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.User;


@Repository
@Mapper
public interface UserMapper {
    // public void safeUser(Member value);

    public void registUser(User value);

    // public List<Member> getUserId(String id);
    // public Member findById(String email);


}
