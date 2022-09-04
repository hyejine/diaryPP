package com.example.demo.config.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.example.demo.config.auth.PrincipalDetails;
import com.example.demo.model.dao.UserRepository;
import com.example.demo.model.dto.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


// JWT 토큰이 유효한지 검증 
// 권한이나 인증이 필요한 특정 주소 요청 => BasicAuthenticationFilter 필터 거침
public class JwtAuthorizationFilter extends BasicAuthenticationFilter{

    private UserRepository userRepository;
    
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 필터 거침
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String jwtHeader = request.getHeader("Authorization");

        // header 가 있는지 확인 
        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")){
            chain.doFilter(request, response);
            return;
        }
        // Jwt 토큰을 검증해서 정상인지 확인 
        String JwtToken = request.getHeader("Authorization").replace("Bearer", "newChar");

        String username = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(JwtToken).getClaims("username").asString();


        // 서명이 됨 
        if (username !=null){
            User userEntity = userRepository.findByEmail(username);

            PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
            // JWT 토큰 서명을 통해 서명이 정상이면 Authentication 객체 생성 
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
            // 강제로 시큐리티 세션에 접근하여 Authentication 객체 저장 
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        }
    //     if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
    //         Authentication authentication = tokenProvider.getAuthentication(jwt);
    //         SecurityContextHolder.getContext().setAuthentication(authentication);
    //     }

    //     filterChain.doFilter(request, response);
    System.out.println("JwtAuthorizationFilter 실행");
    }
    
}
