package com.example.demo.model.dto.auth;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
//사용자에게서 받은 id, pw를 저장
public class JwtRequest implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;

    private String username;
    private String password;

}
