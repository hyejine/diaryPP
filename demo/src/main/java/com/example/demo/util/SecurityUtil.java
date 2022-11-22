package com.example.demo.util;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.extern.slf4j.Slf4j;

@Slf4j
// AccessToken을 복호화 해서 SecurityContext에 유저 정보 저장
// SecurityContext에서 전역으로 유저 정보를 제공하는 유틸 클래스
// Request가 들어오면 JwtFilter의 doFilter에서 저장되는데 거기에 있는 인증정보를 꺼내서, 그 안의 id를 반환
public class SecurityUtil {

    private static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

    private SecurityUtil() {
    }

    public static Long getCurrentUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        System.out.println("2.authentication=== "+authentication.getName());
        System.out.println("2.authentication=== "+authentication);

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        // 인증이 안되면 anonymousUser 리턴함
        return Long.parseLong(authentication.getName());
    }
        // if (authentication == null) {
        //     logger.debug("Security Context에 인증 정보가 없습니다.");
        //     return Optional.empty();
        // }

        // String username = null;
        // if (authentication.getPrincipal() instanceof UserDetails) {
        //     UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
        //     username = springSecurityUser.getUsername();
        // } else if (authentication.getPrincipal() instanceof String) {
        //     username = (String) authentication.getPrincipal();
        // }

        // return Optional.ofNullable(username);
    }
    
    // private SecurityUtil() { }

    // // SecurityContext 에 유저 정보가 저장되는 시점
    // // Request 가 들어올 때 JwtFilter 의 doFilter 에서 저장
    // public static Long getCurrentMemberId() {
    //     final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     System.out.println("2. authentication"+authentication);

    //     if (authentication == null || authentication.getName() == null) {
    //         throw  new RuntimeException("Security Context 에 인증 정보가 없습니다.");
    //     }
    //     System.out.println("2. authentication.getName"+authentication.getName());

    //     return Long.parseLong(authentication.getName());
    // }
