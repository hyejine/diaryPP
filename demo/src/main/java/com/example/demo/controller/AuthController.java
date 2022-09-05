package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.auth.PrincipalDetails;
// import com.example.demo.config.jwt.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
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
        System.out.println(principalDetails);
        return null;
        // authenticate(principalDetails.getUsername(), principalDetails.getPassword());

        // final UserDetails userDetails = userDetailsService
        //     .loadUserByUsername(principalDetails.getUsername());

        // final String token = JwtTokenUtil.generateToken(userDetails);

        // return ResponseEntity.ok(new JwtResponse(token));
    }

    // private void authenticate(String username, String password) {
    // }
}
