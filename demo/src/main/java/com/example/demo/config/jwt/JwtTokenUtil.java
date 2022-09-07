package com.example.demo.config.jwt;

import java.io.Serializable;
import java.security.Key;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

// JWT 검증 / 생성 
@Component
@RequiredArgsConstructor
public class JwtTokenUtil implements Serializable{
    private static final long serialVersionUID = -2550185165626007488L;
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    // private final UserDetailsService userDetailsService;
    // private final long JWT_TOKEN_VALIDITY  = 2 * 60 * 60 * 1000L;
    // private final long refreshTokenValidTime = 2 * 7 * 24 * 60 * 60 * 1000L;
    // private static final String AUTHORITIES_KEY = "auth";
    // private static final String BEARER_TYPE = "bearer";
    // private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
    // private Key key;
    private SecretKey key;
    // private Key key;
    @Value("${jwt.secret}") 
    public String secret;
    // Keys key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));

    // private final Key key;

    // public void TokenProvider( String secret) {
    //     byte[] keyBytes = Decoders.BASE64.decode(secret);
    //     this.key = Keys.hmacShaKeyFor(keyBytes);
    // }
    
    // jwt 토큰에서 사용자 이름 검색
    public String getUsernameFromToken(String token) {
        System.out.println("===getUsernameFromToken==="+token);
        return getClaimFromToken(token, Claims::getSubject);
    }

    // jwt 토큰에서 만료 날짜 검색
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

     public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        System.out.println("==getClaimFromToken=="+token);
        final Claims claims = getAllClaimsFromToken(token);
        System.out.println(claimsResolver.apply(claims));

        return claimsResolver.apply(claims);
        
    }

    // 토큰에서 정보를 검색하기 위해 비밀키 이용
    private Claims getAllClaimsFromToken(String token) {
        System.out.println("==getAllClaimsFromToken=="+token);
        System.out.println(Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody());

        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
    }

    // 토큰이 만료 확인 
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // 사용자에 대한 토큰 생성
    public String generateToken(UserDetails userDetails) {
        System.out.println("=======generateToken=======" +userDetails.getUsername());
        Map<String, Object> claims = new HashMap<>();
        System.out.println("==========claims========"+claims);
        return doGenerateToken(claims, userDetails.getUsername());
    }

    // 1. 발급자, 만료, 제목 및 ID와 같은 토큰의 클레임을 정의
    // 2. HS512 알고리즘 및 비밀 키를 사용하여 JWT에 서명
    // 3. JWT를 URL 안전 문자열로 압축
    // byte[] keyBytes = Decoders.BASE64.decode(secret);

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        System.out.println(secret+"??????????");
            return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 5 * 1000))
            .signWith( Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)), SignatureAlgorithm.HS512 ).compact(); 
    }


    // 토큰 유효성 검사
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    // // 토큰에서 Claim 추출
    // private Claims getClaimsFormToken(String token) {
    //     return Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).build().parseClaimsJws(token).getBody();
    // }

    // // 토큰에서 인증 subject 추출
    // private String getSubject(String token) {
    //     return getClaimsFormToken(token).getSubject();
    // }
    // public Authentication getAuthentication(String accessToken) {
    //     Claims claims = parseClaims(accessToken);

    //     if (claims.get(AUTHORITIES_KEY) == null) {
    //         throw new RuntimeException("권한 정보가 없는 토큰입니다.");
    //     }

    //     Collection<? extends GrantedAuthority> authorities =
    //             Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
    //                     .map(SimpleGrantedAuthority::new)
    //                     .collect(Collectors.toList());

    //     UserDetails principal = new User(claims.getSubject(), "", authorities);

    //     return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    // }
    // 토큰에서 인증 정보 추출
    // public Authentication getAuthentication(String token) {
    //     UserDetails userDetails = userDetailsService.loadUserByUsername(this.getSubject(token));
    //     return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    // }

    // 토큰 발급
    // public String generateJwtToken(Authentication authentication) {
    //     Claims claims = Jwts.claims().setSubject(String.valueOf(authentication.getPrincipal()));
    //     claims.put("roles", authentication.getAuthorities());
    //     Date now = new Date();
    //     return Jwts.builder()
    //             .setClaims(claims)
    //             .setIssuedAt(now)
    //             .setExpiration(new Date(now.getTime() + accessTokenValidTime))
    //             .signWith(key, SignatureAlgorithm.HS512)
    //             .compact();
    // }

    // 토큰 검증 
    // public boolean isValidToken(String token) {
    //     try {
    //         Claims claims = getClaimsFormToken(token);
    //         return !claims.getExpiration().before(new Date());
    //     } catch (JwtException | NullPointerException exception) {
    //         return false;
    //     }
    // }
    // 토큰 생성
    // public TokenDto generateTokenDto(Authentication authentication) {

    //     String authorities = authentication.getAuthorities().stream()
    //             .map(GrantedAuthority::getAuthority)
    //             .collect(Collectors.joining(","));

    //     long now = (new Date()).getTime();


    //     Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);

    //     System.out.println(tokenExpiresIn);

    //     String accessToken = Jwts.builder()
    //             .setSubject(authentication.getName())
    //             .claim(AUTHORITIES_KEY, authorities)
    //             .setExpiration(tokenExpiresIn)
    //             .signWith(key, SignatureAlgorithm.HS512)
    //             .compact();

    //     return TokenDto.builder()
    //             .grantType(BEARER_TYPE)
    //             .accessToken(accessToken)
    //             .tokenExpiresIn(tokenExpiresIn.getTime())
    //             .build();
    // }

    // public boolean validateToken(String token) {
    //     try {
    //         Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    //         return true;
    //     } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
    //         log.info("잘못된 JWT 서명입니다.");
    //     } catch (ExpiredJwtException e) {
    //         log.info("만료된 JWT 토큰입니다.");
    //     } catch (UnsupportedJwtException e) {
    //         log.info("지원되지 않는 JWT 토큰입니다.");
    //     } catch (IllegalArgumentException e) {
    //         log.info("JWT 토큰이 잘못되었습니다.");
    //     }
    //     return false;
    // }
}
