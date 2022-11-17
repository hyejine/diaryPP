package com.example.demo.model.entity;

import java.util.Date;
import lombok.Data;

@Data
public class DiaryDto {

    private Integer diary_id;

    private Date diary_create_write;

    private String diary_date;

    private String user_email;

    private String diary_title;

    private String diary_content;

    private String emoji_image_id;

    private EmojiImageDto emojiImageDto;
}
