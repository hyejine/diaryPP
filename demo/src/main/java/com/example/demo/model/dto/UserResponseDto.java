package com.example.demo.model.dto;

import com.example.demo.model.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    private String email;
    private String userName;

    public static UserResponseDto of (UserEntity userEntity){
        return UserResponseDto.builder()
        .email(userEntity.getUser_email())
        .userName(userEntity.getUser_name())
        .build();
    }
}
