package com.example.demo.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class userDto{
    
    public Integer id;

    public String user_email;

    public String user_name;

    public String user_password;

    public String user_hashPassword;

    public String user_phone;

    public String user_image;

    public Date user_create;

    public String sns_id;

    public String sns_type;

    public String user_type;
}
