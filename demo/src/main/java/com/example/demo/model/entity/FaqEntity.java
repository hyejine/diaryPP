package com.example.demo.model.entity;

import java.util.Date;

import lombok.Data;

@Data
public class FaqEntity {

    private Integer id;

    private String faq_category;

    private String faq_tilte;

    private String faq_content;

    private Date faq_create_date;

    private String faq_writer_id;

    private Date faq_update_date;

    private String faq_update_id;

    private String faq_delete;

    private String faq_writer_role;
}
