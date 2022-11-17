package com.example.demo.model.dto.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//사용자에게서 받은 id, pw를 저장
public class LoginDto {

    private String username;
    private String password;

}
