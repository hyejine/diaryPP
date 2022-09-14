package com.example.demo.model.dto;

import java.util.List;

import lombok.Data;

@Data
public class EmojiDto {

    public Integer id;

    public String emoji_name;

    public Integer emoji_price;

    public List<EmojiImageDto> emoji_type;
}
