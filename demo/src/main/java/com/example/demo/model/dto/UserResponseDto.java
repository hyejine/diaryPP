package com.example.demo.model.dto;

import com.example.demo.model.entity.CustomEntity;
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

    private String user_email;
    private String user_name;
    private Integer user_id;
    private CustomEntity custom;

    public static UserResponseDto of(UserEntity userEntity) {
        return UserResponseDto.builder()
                .user_email(userEntity.getUser_email())
                .user_name(userEntity.getUser_name())
                .user_id(userEntity.getId())
                .custom(userEntity.getCustom_user())
                .build();
    }
}
