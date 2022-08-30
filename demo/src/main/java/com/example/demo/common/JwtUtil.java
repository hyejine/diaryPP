package com.example.demo.common;

import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;

    private Key key;

    public JwtUtil(String secret){
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String createToken(Long id, String name){
        String token = Jwts.builder()
        .claim("userId", id)
        .claim("name", name)
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
    return token;
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)  //JWS = Signature 가 포함된 내용
                    .getBody();
    }

    @Bean
    public JwtUtil jwtUtil(){
        return new JwtUtil(secret);
    }
}
