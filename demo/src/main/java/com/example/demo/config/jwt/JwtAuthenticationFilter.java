package com.example.demo.config.jwt;

import java.io.BufferedReader;
import java.io.IOException;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.config.JwtTokenUtil;
import com.example.demo.config.auth.PrincipalDetails;
import com.example.demo.model.dto.User;
import com.example.demo.service.JwtUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

// @Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

   private final AuthenticationManager authenticationManager;
   private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
   private final Key key;
   
   // login 요청 하면 로그인 시도를 위해 실행되는 함수  
   @Override
   public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException{
            System.out.println("JwtAuthenticationFilter 실행");
            try {
                //getInputStream()안에 id/pw 담겨있음 
                System.out.println(request.getInputStream().toString());
                // id/pw 값 읽어내기 (밑에 방법이 간단함)
                // BufferedReader br = request.getReader();

                // String input = null;
                // while ((input = br.readLine())!=null) {
                //     System.out.println(input);
                // }

                // json 파싱 
                ObjectMapper om = new ObjectMapper();
                User user = om.readValue(request.getInputStream(), User.class);
                System.out.println(user);

                // 토큰 생성 
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUser_email(), user.getUser_password());
                // 토큰으로 로그인 시도 
                // PrincipalDetailsSerivce의 loadUserByUsername() 함수 실행 정상이면 authentication 리턴 => DB에 있는 id/pw 일치
                // authentication 로그인 정보가 담겨 있음 
                Authentication authentication = authenticationManager.authenticate(authenticationToken);

                // 출력되면 로그인 된거임 
                PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
                System.out.println(principalDetails.getUser().getUser_email());
                // authentication 객체가 session 영역에 저장됨
                // JWT 토큰 사용시 세션 필요 XX, 권한 관리를 security가 대신 관리하게 하기 위해 세션 저장
                return authentication;

            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }

        // attemptAuthentication실행 후 인증 정상적으로 되면 successfulAuthentication()실행 
        // JWT 토큰을 만들어 request 요청한 사용자에게 JWT토큰을 response 해줌 
        @Override
        protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult)
        throws IOException, ServletException{
            System.out.println("successfulAuthentication 실행");
            PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

            long now = (new Date()).getTime();
            Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);

            String authorities = authResult.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));
            
            String jwtToken = Jwts.builder()
             .setSubject(authResult.getName())
             .setExpiration(tokenExpiresIn)  // 토큰 만료 시간
             .claim("username", authorities) 
             .signWith(key, SignatureAlgorithm.HS512)
             .compact();

            response.addHeader("Authorization", "Bearer"+jwtToken);
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
