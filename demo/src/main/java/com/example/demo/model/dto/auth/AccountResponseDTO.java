package com.example.demo.model.dto.auth;

import com.example.demo.model.dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountResponseDTO {

    private Integer id;
    private String email;
    private String name;
    private String password;
    private String phone;
    private String image;

    public static AccountResponseDTO of(UserDto account) {
        return AccountResponseDTO.builder()
                .id(account.getId())
                .email(account.getUser_email())
                .name(account.getUser_name())
                .password(account.getUser_password())
                .phone(account.getUser_phone())
                .image(account.getUser_image())
                .build();
    }


}