// package com.example.demo.config.jwt;

// import java.io.Serializable;
// import java.security.Key;
// import java.util.Arrays;
// import java.util.Base64;
// import java.util.Collection;
// import java.util.Date;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.function.Function;
// import java.util.stream.Collectors;

// import javax.annotation.PostConstruct;
// import javax.xml.bind.DatatypeConverter;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.stereotype.Component;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.ExpiredJwtException;
// import io.jsonwebtoken.JwtException;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.MalformedJwtException;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.UnsupportedJwtException;
// import io.jsonwebtoken.io.Decoders;
// import io.jsonwebtoken.security.Keys;
// import lombok.RequiredArgsConstructor;

// // JWT 검증 / 생성 
// @Component
// @RequiredArgsConstructor
// public class JwtTokenUtil {
//     private final UserDetailsService userDetailsService;
//     private final long accessTokenValidTime = 2 * 60 * 60 * 1000L;
//     private final long refreshTokenValidTime = 2 * 7 * 24 * 60 * 60 * 1000L;
//     // private static final String AUTHORITIES_KEY = "auth";
//     // private static final String BEARER_TYPE = "bearer";
//     // private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
//     private Key key;

    
//     @Value("${jwt.secret}")
//     private String secretKey;

//     // @PostConstruct
//     // private void init() {
//     //     secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//     // }

//     public void TokenProvider(@Value("${jwt.secret}") String secretKey) {
//         byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//         this.key = Keys.hmacShaKeyFor(keyBytes);
//     }

//     // 토큰에서 Claim 추출
//     private Claims getClaimsFormToken(String token) {
//         return Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).build().parseClaimsJws(token).getBody();
//     }

//     // 토큰에서 인증 subject 추출
//     private String getSubject(String token) {
//         return getClaimsFormToken(token).getSubject();
//     }
//     // public Authentication getAuthentication(String accessToken) {
//     //     Claims claims = parseClaims(accessToken);

//     //     if (claims.get(AUTHORITIES_KEY) == null) {
//     //         throw new RuntimeException("권한 정보가 없는 토큰입니다.");
//     //     }

//     //     Collection<? extends GrantedAuthority> authorities =
//     //             Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
//     //                     .map(SimpleGrantedAuthority::new)
//     //                     .collect(Collectors.toList());

//     //     UserDetails principal = new User(claims.getSubject(), "", authorities);

//     //     return new UsernamePasswordAuthenticationToken(principal, "", authorities);
//     // }
//     // 토큰에서 인증 정보 추출
//     public Authentication getAuthentication(String token) {
//         UserDetails userDetails = userDetailsService.loadUserByUsername(this.getSubject(token));
//         return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
//     }

//     // 토큰 발급
//     public String generateJwtToken(Authentication authentication) {
//         Claims claims = Jwts.claims().setSubject(String.valueOf(authentication.getPrincipal()));
//         claims.put("roles", authentication.getAuthorities());
//         Date now = new Date();
//         return Jwts.builder()
//                 .setClaims(claims)
//                 .setIssuedAt(now)
//                 .setExpiration(new Date(now.getTime() + accessTokenValidTime))
//                 .signWith(key, SignatureAlgorithm.HS512)
//                 .compact();
//     }

//     // 토큰 검증 
//     public boolean isValidToken(String token) {
//         try {
//             Claims claims = getClaimsFormToken(token);
//             return !claims.getExpiration().before(new Date());
//         } catch (JwtException | NullPointerException exception) {
//             return false;
//         }
//     }
//     // 토큰 생성
//     // public TokenDto generateTokenDto(Authentication authentication) {

//     //     String authorities = authentication.getAuthorities().stream()
//     //             .map(GrantedAuthority::getAuthority)
//     //             .collect(Collectors.joining(","));

//     //     long now = (new Date()).getTime();


//     //     Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);

//     //     System.out.println(tokenExpiresIn);

//     //     String accessToken = Jwts.builder()
//     //             .setSubject(authentication.getName())
//     //             .claim(AUTHORITIES_KEY, authorities)
//     //             .setExpiration(tokenExpiresIn)
//     //             .signWith(key, SignatureAlgorithm.HS512)
//     //             .compact();

//     //     return TokenDto.builder()
//     //             .grantType(BEARER_TYPE)
//     //             .accessToken(accessToken)
//     //             .tokenExpiresIn(tokenExpiresIn.getTime())
//     //             .build();
//     // }

//     // public boolean validateToken(String token) {
//     //     try {
//     //         Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//     //         return true;
//     //     } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//     //         log.info("잘못된 JWT 서명입니다.");
//     //     } catch (ExpiredJwtException e) {
//     //         log.info("만료된 JWT 토큰입니다.");
//     //     } catch (UnsupportedJwtException e) {
//     //         log.info("지원되지 않는 JWT 토큰입니다.");
//     //     } catch (IllegalArgumentException e) {
//     //         log.info("JWT 토큰이 잘못되었습니다.");
//     //     }
//     //     return false;
//     // }
// }
