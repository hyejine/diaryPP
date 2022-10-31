package com.example.demo.service.interfaces;

import com.example.demo.model.dto.EmailDto;

public interface IMailService {

    public void postContactUs(EmailDto value);
    
}
