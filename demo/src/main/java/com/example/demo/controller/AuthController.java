package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.auth.PrincipalDetails;
import com.example.demo.config.auth.PrincipalDetailsService;
import com.example.demo.config.jwt.JwtTokenUtil;
import com.example.demo.model.dto.auth.JwtResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final PrincipalDetailsService principalDetailsService;
    // private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;
    // private final AuthService authService;

    // @PostMapping("/signup")
    // public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
    //     return ResponseEntity.ok(authService.signup(requestDto));
    // }

    // @PostMapping("/login")
    // public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
    //     return ResponseEntity.ok(authService.login(requestDto));
    // }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody PrincipalDetails principalDetails) throws Exception {
        // user 객체 나옴 
        // 사용자 요청 정보로 UserPasswordAuthenticationToken 객체 발급
        authenticate(principalDetails.getUsername(), principalDetails.getPassword());
        // 토큰 생성
        final UserDetails userDetails = principalDetailsService.loadUserByUsername(principalDetails.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        System.out.println(principalDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
