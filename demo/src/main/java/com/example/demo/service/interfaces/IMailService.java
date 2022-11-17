package com.example.demo.service.interfaces;

import com.example.demo.model.entity.EmailContentDto;

public interface IMailService {

    public void sendMail(String to, String subject, String body);

    public void postContactUs(EmailContentDto value);
    
}
