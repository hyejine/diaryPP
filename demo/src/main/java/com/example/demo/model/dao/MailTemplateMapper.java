package com.example.demo.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.MailTemplateDto;

@Repository
@Mapper
public interface MailTemplateMapper {
    public MailTemplateDto getEmailContent(String templateName);
    
}
