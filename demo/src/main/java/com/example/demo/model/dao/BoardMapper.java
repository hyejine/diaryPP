package com.example.demo.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.DiaryDto;

@Repository
@Mapper
public interface BoardMapper {
    public int saveQuill(DiaryDto data);

    public int updateQuill(DiaryDto data);

    public List<DiaryDto> getBoard(DiaryDto data);

    public List<DiaryDto> getMonthBoard();

    public int deleteBoard(Integer id);

    public List<DiaryDto> getMonth(String sendFormatDate);

    public List<DiaryDto> getMonthProgress(@Param("diary_date") String sendFormatDate,
            @Param("user_email") String email);

    public List<DiaryDto> getYearProgress(DiaryDto data);

    public List<DiaryDto> getYear(String year);

    // public List<DiaryDto> getMonthMoodGrap(String sendFormatDate);

    // public List<DiaryDto> getOneDiary(Long id);
}
