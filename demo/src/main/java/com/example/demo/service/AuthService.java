package com.example.demo.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.config.jwt.JwtProvier;
import com.example.demo.model.dao.AccountRepository;
import com.example.demo.model.dao.RefreshTokenRepository;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.dto.auth.AccountRequestDTO;
import com.example.demo.model.dto.auth.AccountResponseDTO;
import com.example.demo.model.dto.auth.RefreshToken;
import com.example.demo.model.dto.auth.TokenDto;
import com.example.demo.model.dto.auth.TokenRequestDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvier tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public AccountResponseDTO signup(AccountRequestDTO accountRequestDTO) {
        if (accountRepository.existsByEmail(accountRequestDTO.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다. ");
        }
        UserDto account = accountRequestDTO.toAccount(passwordEncoder);
        return AccountResponseDTO.of(accountRepository.save(account));
    }

    @Transactional
    public TokenDto login(AccountRequestDTO accountRequestDTO) {
        // 1. Login ID / PW 를 기반으로 UsernamePasswordAuthenticationToken를 생성
        // AuthenticationManager 에서 authenticate 메소드의 파라미터로 넘겨서 검증 후에 Authentication 를 받음
        UsernamePasswordAuthenticationToken authenticationToken = accountRequestDTO.toAuthentication();
        System.out.println("2. authenticationToken"+authenticationToken);

        // 2. 실제 검증이 이루어지는 부분
        // Builder 에서 UserDetails 의 유저 정보가 서로 일치하는지 검사
        // authenticate 메서드가 실행이 될 때, CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행된다.
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        System.out.println("2. authentication"+authentication);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDTO = tokenProvider.generateTokenDTO(authentication);
        System.out.println("4. tokenDTO"+tokenDTO);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .user_id(authentication.getName())
                .user_refreshToken(tokenDTO.getRefreshToken())
                .build();
        refreshTokenRepository.save(refreshToken);
        System.out.println("5. refreshToken"+refreshToken);

        // 5. 토큰 발급
        return tokenDTO;
    }

    public TokenDto reIssue(TokenRequestDTO tokenRequestDTO) {
        // 1. Refresh 토큰 검증
        if (!tokenProvider.validateToken(tokenRequestDTO.getRefreshToken())) {
            throw new RuntimeException("Refresh 토큰이 유효하지 않습니다. ");
        }
        // 2. Access Token 에서 Account ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDTO.getAccessToken());

        // 3. Repository 에서 Account ID 기반으로 Refresh 토큰 값을 가져온다.
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다. "));

        // 4. Refresh Token 이 일치하는지 검사
        if (!refreshToken.getUser_refreshToken().equals(tokenRequestDTO.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다. ");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDTO = tokenProvider.generateTokenDTO(authentication);

        // 6. Repository 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDTO.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 7. 토큰 발급
        return tokenDTO;
    }
}
