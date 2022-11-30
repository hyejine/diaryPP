package com.example.demo.model.entity;

import java.util.Date;
import java.util.Set;

import org.springframework.security.core.userdetails.User;

import com.example.demo.model.dto.UserRequestDto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class UserEntity {

    private Integer id;

    private String user_email;

    private String user_name;

    private String user_password;

    private String user_phone;

    private String user_image;

    private Date user_create;

    private String sns_id;

    private String sns_type;

    private String user_type;

    private CustomEntity custom_user;

    @Builder
    public UserEntity(String user_email, String user_password, String user_name, String user_phone, String user_image,
            Date user_create,
            String sns_id, String sns_type, String user_type, CustomEntity custom_user) {
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_name = user_name;
        this.user_phone = user_phone;
        this.user_image = user_image;
        this.user_create = user_create;
        this.sns_id = sns_id;
        this.sns_type = sns_type;
        this.user_type = user_type;
        this.custom_user = custom_user;

    }
}
