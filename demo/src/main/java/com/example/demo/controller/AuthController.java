package com.example.demo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.jwt.JwtFilter;
import com.example.demo.config.jwt.JwtProvier;
import com.example.demo.model.dto.auth.LoginDto;
import com.example.demo.model.dto.auth.TokenDto;
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtProvier jwtProvier;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthController(JwtProvier jwtProvier, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.jwtProvier = jwtProvier;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }


    // @PostMapping("/signup")
    // public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
    //     return ResponseEntity.ok(authService.signup(requestDto));
    // }

    @GetMapping("/hello")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("hello");
    }

    @PostMapping("/login")
    @Validated
    public ResponseEntity<TokenDto> authorize(@RequestBody LoginDto loginDto) {

        System.out.println(loginDto.getUsername());
        System.out.println(loginDto.getPassword());

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        System.out.println("1. authenticationToken : "+authenticationToken);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        System.out.println("2. authentication : "+authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvier.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }
       
        // user 객체 나옴 
        // authenticate(principalDetails.getUsername(), principalDetails.getPassword());
        // // // username, password 추출
        // final UserDetails userDetails = principalDetailsService.loadUserByUsername(principalDetails.getUsername());
        // System.out.println("===userDetails====="+userDetails);
        // // // 토큰 생성
        // // // 사용자 요청 정보로 UserPasswordAuthenticationToken 객체 발급
        // final String token = jwtTokenUtil.generateToken(userDetails);
        // System.out.println("token"+token);

        // return ResponseEntity.ok(new JwtResponse(token));


    // private void authenticate(String username, String password) throws Exception {
    //     try {
            
    //         authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    //     } catch (DisabledException e) {
    //         System.out.println(e);
    //         throw new Exception("USER_DISABLED", e);
    //     } catch (BadCredentialsException e) {
    //         System.out.println(e);
    //         throw new Exception("INVALID_CREDENTIALS", e);
    //     }
    // }
}
