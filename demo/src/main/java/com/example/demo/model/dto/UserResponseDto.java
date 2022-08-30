package com.example.demo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String email;

    public static UserResponseDto of(AuthUserDto user) {
        return new UserResponseDto(user.getUser_email());
    }
}
