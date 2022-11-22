package com.example.demo.model.dto.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
// 사용자에게 반환될 JWT를 담은 Response
public class TokenDto {

    private String grantType;
    private String accessToken;
    private String refreshToken;
    // private Long accessTokenExpiresIn;

}
