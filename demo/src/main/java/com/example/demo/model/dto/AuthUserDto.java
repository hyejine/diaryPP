package com.example.demo.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthUserDto {
    private Integer id;

    private String user_email;

    private String user_password;

    private UserType user_type;

    @Builder
    public AuthUserDto(String user_email, String user_password, UserType user_type){
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_type = user_type;
    }
}
