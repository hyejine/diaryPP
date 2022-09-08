package com.example.demo.model.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
// 사용자에게 반환될 JWT를 담은 Response
public class TokenDto {
    private String jwttoken;
}
