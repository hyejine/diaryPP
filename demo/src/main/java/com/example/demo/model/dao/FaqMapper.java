package com.example.demo.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.SearchDto;
import com.example.demo.model.entity.FaqEntity;

@Repository
@Mapper
public interface FaqMapper {
    public List<FaqEntity> getAllList();

    public List<FaqEntity> searchData(SearchDto value);
}
