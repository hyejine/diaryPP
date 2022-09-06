package com.example.demo.config.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.config.auth.PrincipalDetailsService;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;

// Header를 통해 JWT의 인증 요청이 왔을때 처리하는 Filter 생성
// JWT 토큰이 유효한지 검증 
// 권한이나 인증이 필요한 특정 주소 요청 => BasicAuthenticationFilter 필터 거침
@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter{

    private final JwtTokenUtil jwtTokenUtil;
    private final PrincipalDetailsService principalDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
            
            final String requestTokenHeader = request.getHeader("Authorization");
            
            System.out.println("====requestTokenHeader===="+requestTokenHeader);

            String username = null;
            String jwtToken = null;

            if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
                jwtToken = requestTokenHeader.substring(7);
                try {
                    username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                } catch (IllegalArgumentException e) {
                    System.out.println("Unable to get JWT Token");
                } catch (ExpiredJwtException e) {
                    System.out.println("JWT Token has expired");
                }
            } else {
                logger.warn("JWT Token does not begin with Bearer String");
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                System.out.println("?????????username>>>>>>>>"+username);
                UserDetails userDetails = this.principalDetailsService.loadUserByUsername(username);
    
                // if token is valid configure Spring Security to manually set
                // authentication
                if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
    
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    // After setting the Authentication in the context, we specify
                    // that the current user is authenticated. So it passes the
                    // Spring Security Configurations successfully.
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    System.out.println("usernamePasswordAuthenticationToken??"+usernamePasswordAuthenticationToken);
                }
            }
            filterChain.doFilter(request, response);
        }

    

//     public static final String AUTHORIZATION_HEADER = "Authorization";
//     public static final String BEARER_PREFIX = "Bearer ";
//     private final JwtTokenUtil jwtTokenUtil;

//     // 토큰 인증 정보를 현재 쓰레드의 SecurityContext 에 저장하는 역할 수행
//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        
//           // Request Header에서 토큰 추출
//           String jwt = resolveToken(request);
//           System.out.println("jwt : " + jwt);
//           // Token 유효성 검사
//           if (StringUtils.hasText(jwt) && jwtTokenUtil.isValidToken(jwt)) {
//               System.out.println("jwt 통과");
//               // 토큰으로 인증 정보를 추출
//               Authentication authentication = jwtTokenUtil.getAuthentication(jwt);
//               // SecurityContext에 저장
//               SecurityContextHolder.getContext().setAuthentication(authentication);
//           } else {
//               System.out.println("jwt 실패");
//           }
  
//           filterChain.doFilter(request, response);
//       }

//     // Request Header에서 토큰 추출
//     private String resolveToken(HttpServletRequest request) {
//         String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
//         if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
//             return bearerToken.substring(7);
//         }
//         return null;
//     }

//     // private UserRepository userRepository;
    
//     // public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
//     //     super(authenticationManager);
//     //     this.userRepository = userRepository;
//     // }

//     // // 인증이나 권한이 필요한 주소요청이 있을 때 필터 거침
//     // @Override
//     // protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//     //     String jwtHeader = request.getHeader("Authorization");

//     //     // header 가 있는지 확인 
//     //     if(jwtHeader == null || !jwtHeader.startsWith("Bearer")){
//     //         chain.doFilter(request, response);
//     //         return;
//     //     }
//     //     // Jwt 토큰을 검증해서 정상인지 확인 
//     //     String JwtToken = request.getHeader("Authorization").replace("Bearer", "newChar");

//     //     String username = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(JwtToken).getClaims("username").asString();


//     //     // 서명이 됨 
//     //     if (username !=null){
//     //         User userEntity = userRepository.findByEmail(username);

//     //         PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
//     //         // JWT 토큰 서명을 통해 서명이 정상이면 Authentication 객체 생성 
//     //         Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
//     //         // 강제로 시큐리티 세션에 접근하여 Authentication 객체 저장 
//     //         SecurityContextHolder.getContext().setAuthentication(authentication);
//     //     }
//     //     chain.doFilter(request, response);
//     // System.out.println("JwtAuthorizationFilter 실행");
//     // }
    
}
