package com.example.demo.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.DiaryDto;

@Repository
@Mapper
public interface BoardMapper {
    public int saveQuill(DiaryDto data);

    public List<DiaryDto> getBoard(Long id); 

    public List<DiaryDto> getMonthBoard();

    public DiaryDto deleteBoard(Long id); 

    // public List<DiaryDto> getOneDiary(Long id);
}
