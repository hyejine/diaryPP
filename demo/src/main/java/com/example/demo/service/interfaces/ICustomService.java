package com.example.demo.service.interfaces;

import org.springframework.http.ResponseEntity;

import com.example.demo.model.entity.CustomEntity;

public interface ICustomService {

    public void postFont(CustomEntity value);

    public CustomEntity getUserCustom(String email);

}
