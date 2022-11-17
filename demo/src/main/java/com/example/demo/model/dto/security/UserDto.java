package com.example.demo.model.dto.security;

import lombok.Data;

@Data
public class UserDto {
    private String username;

    private String password;

    private String nickname;
}
