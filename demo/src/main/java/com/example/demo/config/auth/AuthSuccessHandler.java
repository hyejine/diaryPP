// package com.example.demo.config.auth;

// import java.io.IOException;

// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
// import org.springframework.stereotype.Component;

// import com.example.demo.config.ApiResponse;
// import com.example.demo.config.jwt.JwtTokenUtil;

// import lombok.RequiredArgsConstructor;

// @Component
// @RequiredArgsConstructor
// public class AuthSuccessHandler implements AuthenticationSuccessHandler {
   
//     private final JwtTokenUtil jwtProvider;

//     @Override
//     public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//         // 전달받은 인증정보 SecurityContextHolder에 저장
//         SecurityContextHolder.getContext().setAuthentication(authentication);
//         // JWT Token 발급
//         final String token = jwtProvider.generateJwtToken(authentication);
//         // Response
//         ApiResponse.token(response, token);
//     }
// }
