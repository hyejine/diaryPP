package com.example.demo.jwt;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.demo.model.entity.TokenEntity;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

// 토큰의 생성, 토큰의 유효성 검증 등을 담당
@Component
public class JwtProvier implements InitializingBean {

    private final Logger log = LoggerFactory.getLogger(JwtProvier.class);

    private static final String AUTHORITIES_KEY = "auth";

    private final String secret;

    private final long tokenValidityInMilliseconds;

    private Key key;

    public JwtProvier(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds) {
                this.secret = secret;
                this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // Authentication 객체의 권한정보를 이용해서 AccessToken, RefreshToken 토큰을 생성
    public TokenEntity createToken(Authentication authentication) {
        // 권한 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenValidityInMilliseconds);

        // Access Token 생성
        String accessToken = Jwts.builder()
                            .setSubject(authentication.getName())
                            .claim(AUTHORITIES_KEY, authorities)
                            .signWith(key, SignatureAlgorithm.HS512)
                            .setExpiration(validity)
                            .compact();

        // Refresh Token 생성 
        String refreshToken = Jwts.builder()
                            .setExpiration(new Date(now + 86400000))
                            .signWith(key, SignatureAlgorithm.HS256)
                            .compact();

        
        return TokenEntity.builder()
                        .grantType("Bearer")
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                    
    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if(claims.get(AUTHORITIES_KEY) == null){
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }
        // Claims claims = Jwts
        //         .parserBuilder()
        //         .setSigningKey(key)
        //         .build()
        //         .parseClaimsJws(accessToken)
        //         .getBody();

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰의 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
    // private final Logger log = LoggerFactory.getLogger(JwtProvier.class);

    // private static final String AUTHORITIES_KEY = "auth";

    // private static final String BEARER_TYPE = "bearer";

    // // 30 min
    // private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
    // // 7 days
    // private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;


    // // Spring Security
    // private final Key key;


    // // YAML 혹은 Properties 에 등록되어 있는 SecretKey 값을 가져온다.
    // //      해당 값은 매우 중요하므로 따로 분리해서 보관하는 것이 현명하다.
    // //      따로 보관하는 것이 귀찮다면 암호화하는 방법도 있다.
    // //      HS512 알고리즘을 사용하기 때문에 SecretKey 는 64Byte 이상이어야 한다.
    // public JwtProvier(
    //         @Value("${jwt.secret}") String secretKey) {

    //     // Base64 로 인코딩되어 있는 SecretKey 값을 다시 푼다.
    //     byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    //     // decode 된 secretKey 값을 이용하여
    //     // HMAC SHA 알고리즘을 통해 Key 를 암호화시킨다.
    //     // 이 과정을 통해서 유저 정보를 알 수 있다.
    //     this.key = Keys.hmacShaKeyFor(keyBytes);
    // }

    // // Authentication 객체를 사용하여 토큰을 생성하는 메서드
    // public TokenDto generateTokenDTO(Authentication authentication) {
    //     // 1. Authentication 내부에 존재하는 Authority (권한) 에 관한 정보를 가져온다.
    //     String authorities = authentication.getAuthorities().stream()
    //             .map(GrantedAuthority::getAuthority)
    //             .collect(Collectors.joining(","));

    //     // 2. 토큰 유효 시간을 검증하기 위한 시간 객체 생성
    //     long now = (new Date()).getTime();

    //     // 3. Access Token 생성
    //     //      3.1 미리 셋팅해둔 시간으로 토큰의 수명 설정
    //     Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
    //     //      3.2 JWT 구조에 맞게 정보를 대입해서 Access 토큰을 생성한다. (비교적 짧은 수명)
    //     //      3.3 HS512 알고리즘을 사용하여 Hashing 한다.
    //     //          3.3.1 JWT 에서 Header 로 { "alg" : "HS512" } 로 등록된다.
    //     //          3.3.2 Header 와 Payload 는 JWT 에서 Signature 안에 포함되는데, 이는 토큰의 유효성 검증을 위한 문자열이다.
    //     //          3.3.3 signWith 에 key, alg 을 전달하면 JWS 가 만들어진다.
    //     String accessToken = Jwts.builder()
    //             .setSubject(authentication.getName())
    //             .claim(AUTHORITIES_KEY, authorities)
    //             .setExpiration(accessTokenExpiresIn)
    //             .signWith(key, SignatureAlgorithm.HS512)
    //             .compact();

    //     // JWS 는 또 뭐야?
    //     //  JWT 는 Header // Payload // Signature 로 구성되어 있다.
    //     //  Header : Signature 를 Hashing 하기 위한 알고리즘 정보
    //     //  Payload : JWT 에 대한 내용, 서버 - 클라이언트가 주고받기로 한 값
    //     //  Signature : Token 의 유효성을 검증하기 위한 문자열
    //     //  클라이언트의 요청 -> 서버가 Payload 로 응답을 내보내는데 서명(sign) 을 하고 Token 을 발행한다.
    //     //  이때 서명이 완료된 응답을 Token 화 한 것을 JWS 라고 한다.

    //     // HMAC-SHA 알고리즘에 관한 설명
    //     // 링크 : https://juneyr.dev/2019-06-10/spring-hmac


    //     // 4. Refresh Token 생성
    //     //      4.1 JWT 구조에 맞게 정보를 대입해서 Refresh 토큰을 생성한다. (비교적 긴 수명)
    //     String refreshToken = Jwts.builder()
    //             .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
    //             .signWith(key, SignatureAlgorithm.HS512)
    //             .compact();

    //     // TokenDTO 객체 생성
    //     return TokenDto.builder()
    //             .grantType(BEARER_TYPE)
    //             .accessToken(accessToken)
    //             .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
    //             .refreshToken(refreshToken)
    //             .build();
    // }


    // /**
    //  *
    //  * @param accesstoken
    //  * @return Authentication
    //  * @throws AuthenticationException
    //  * */
    // public Authentication getAuthentication(String accessToken) throws AuthenticationException {
    //     // 1. JWS 문자열을 JWS 객체로 바꿔준다.
    //     Claims claims = parseClaims(accessToken);

    //     // 2. 권한이 없는 경우
    //     if (claims.get(AUTHORITIES_KEY) == null) {
    //         throw new RuntimeException("권한 정보가 없는 Token 입니다. ");
    //     }

    //     // 3. Claim 에서 권한 정보 가져오기
    //     Collection<? extends GrantedAuthority> authorities =
    //             Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
    //                     .map(SimpleGrantedAuthority::new).toList();

    //     // 4. UserDetails 객체를 만들어서 Authentication 을 반환한다.
    //     UserDetails principal = new User(claims.getSubject(), "", authorities);

    //     // 5. principal, authorities 를 담아서 Authentication 객체를 생성 후 리턴
    //     return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    // }

    // /**
    //  * 토큰의 유효성 검사
    //  * @param token
    //  * @return boolean
    //  * */
    // public boolean validateToken(String token) {
    //     try {
    //         Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    //         return true;
    //     } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
    //         log.info("잘못된 JWT 서명입니다. ");
    //     } catch (ExpiredJwtException e) {
    //         log.info("만료된 JWT 토큰입니다. ");
    //     } catch (UnsupportedJwtException e) {
    //         log.info("지원하지 않는 JWT 토큰입니다. ");
    //     } catch (IllegalArgumentException e) {
    //         log.info("올바르지 않은 JWT 토큰입니다. ");
    //     }
    //     return false;
    // }


    // /**
    //  * JWS 스트링을 JWS 객체로 바꿔준다. 
    //  * @param accessToken
    //  * @return Claims
    //  * */
    // private Claims parseClaims(String accessToken) {
    //     try {
    //         return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
    //     } catch (ExpiredJwtException e) {
    //         return e.getClaims();
    //     }
    // }
}
