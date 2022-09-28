package com.example.demo.model.dto;

import java.sql.Blob;
import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class DiaryDto {

    private Integer id;

    private Date diary_create_write;

    private String diary_date;

    private String user_email;

    private String diary_title;

    private String diary_content;

    private EmojiImageDto emoji_image_id;
    // private List<EmojiImageDto> emoji_image_id;
}
