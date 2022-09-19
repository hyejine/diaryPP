package com.example.demo.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.EmojiDto;
import com.example.demo.model.dto.EmojiImageDto;

@Repository
@Mapper
public interface EmojiMapper {
    public List<EmojiDto> getEmojiList();

    public List<EmojiDto> getEmojiImage(String emojiType);

    public EmojiImageDto getEmoji(Long emojiId);


}
