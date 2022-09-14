package com.example.demo.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.EmojiDto;

@Repository
@Mapper
public interface EmojiMapper {
    public List<EmojiDto> getEmojiList();
}
