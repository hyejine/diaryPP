package com.example.demo.model.dto;

import lombok.Data;

@Data
public class SearchDto {
    private String selectContent;

    private String selectCategory;

    private String searchKeyWord;
}
