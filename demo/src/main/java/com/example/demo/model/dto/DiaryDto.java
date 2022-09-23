package com.example.demo.model.dto;

import java.sql.Blob;
import java.util.Date;

import lombok.Data;

@Data
public class DiaryDto {

    public Integer id;

    public String diary_create_write;

    public String diary_date;

    public String user_email;

    public String diary_title;

    public String diary_content;

    public String emoji_image_id;
    
}
