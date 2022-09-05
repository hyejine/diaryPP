package com.example.demo.model.dto.auth;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
// 사용자에게 반환될 JWT를 담은 Response
public class JwtResponse implements Serializable {
    private final String jwttoken;
}
