package com.example.demo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class TokenEntity {
     private String grantType;
     private String accessToken;
     private String refreshToken;
    //  private Long accessTokenExpiresIn;
 
}
