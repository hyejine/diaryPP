package com.example.demo.model.dto;

import java.sql.Blob;
import java.util.Date;

import lombok.Data;

@Data
public class DiaryDto {

    public Integer id;

    public String diaryCreateWrite;

    public String diaryDate;

    public String email;

    public String title;

    public String content;

    public String emojiImageId;
}
