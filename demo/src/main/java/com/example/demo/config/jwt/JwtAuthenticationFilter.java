package com.example.demo.config.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.config.JwtTokenUtil;
import com.example.demo.service.JwtUserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;

// @Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

   private final AuthenticationManager authenticationManager;

   // login 요청 하면 로그인 시도를 위해 실행되는 함수  
   @Override
   public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException{
            System.out.println("JwtAuthenticationFilter 실행");
            try {
                System.out.println(request.getInputStream());
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            return super.attemptAuthentication(request, response);
        }
    // public static final String AUTHORIZATION_HEADER = "Authorization";
    // public static final String BEARER_PREFIX = "Bearer ";
    // private final JwtTokenUtil tokenProvider;
    
    // private String resolveToken(HttpServletRequest request) {
    //     String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
    //     if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
    //         return bearerToken.substring(7);
    //     }
    //     return null;
    // }

    // @Override
    // protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    //     String jwt = resolveToken(request);

    //     if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
    //         Authentication authentication = tokenProvider.getAuthentication(jwt);
    //         SecurityContextHolder.getContext().setAuthentication(authentication);
    //     }

    //     filterChain.doFilter(request, response);
    // }
    
}
