package com.example.demo.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.DiaryDto;

@Repository
@Mapper
public interface DiaryMapper {
    public void saveQuill(DiaryDto data);

    public List<DiaryDto> getBoard();

}
