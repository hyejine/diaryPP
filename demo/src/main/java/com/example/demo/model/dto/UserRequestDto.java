package com.example.demo.model.dto;

import java.util.Date;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.model.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDto {
    private String user_email;
    private String user_name;
    private String user_password;

    public UserEntity toMember(PasswordEncoder passwordEncoder) {
        Date date = new Date();
        return UserEntity.builder()
                .user_email(user_email)
                .user_name(user_name)
                .user_password(passwordEncoder.encode(user_password))
                .user_create(date)
                .user_type("ROLE_USER")
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(user_email, user_password);
    }
}
