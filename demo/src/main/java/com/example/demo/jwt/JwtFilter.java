package com.example.demo.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

// Header를 통해 JWT의 인증 요청이 왔을때 처리하는 Filter 생성
// JWT 토큰이 유효한지 검증 
// 권한이나 인증이 필요한 특정 주소 요청 => BasicAuthenticationFilter 필터 거침
@Component
public class JwtFilter extends OncePerRequestFilter  {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    public static final String AUTHORIZATION_HEADER = "Authorization";

    public static final String BEARER_PREFIX = "Bearer ";
 
    private JwtProvier jwtProvier;
 
    public JwtFilter(JwtProvier jwtProvier) {
       this.jwtProvier = jwtProvier;
    }

    // jwt 토큰 인증정보를 securityContext에 저장
   //  @Override
   //  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
   //          throws IOException, ServletException {
   //              HttpServletRequest httpServletRequest = (HttpServletRequest) request;
   //              String jwt = resolveToken(httpServletRequest);
   //              String requestURI = httpServletRequest.getRequestURI();
          
   //              if (StringUtils.hasText(jwt) && jwtProvier.validateToken(jwt)) {
   //                 Authentication authentication = jwtProvier.getAuthentication(jwt);
   //                 SecurityContextHolder.getContext().setAuthentication(authentication);
   //                 logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
   //              } else {
   //                 logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
   //              }
          
   //              chain.doFilter(request, response);
   //           }

    // 실제 필터링 로직은 doFilterInternal 에 들어간다.
    // 가입/로그인/재발급 을 제외한 모든 Request 요청은 해당 필터를 거친다.
    // 따라서 토큰 정보가 없거나 유효하지 않다면 수행되지 않는다.
    // JWT 토큰의 인증 정보를 현재 Thread 의 SecurityContext 에 저장하는 역할을 수행한다.
    // 요청이 정상적으로 Controller 까지 도착했다면 SecurityContext 에 Account ID 가 존재한다는 것이 보장된다.
    // 직접 DB 를 조회한 것이 아니라, Access Token 에 있는 Account ID 를 꺼낸 거라서, 탈퇴로 인해 Account ID 가 DB 에 없는 등의
    // 예외 상황은 Service 단에서 고려해야한다. 
    
    // request header에서 토큰 정보를 꺼내옴 
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

   // jwt 토큰의 인증정보를 SecurityContext에 저장하는 역할 수행 로직
   // client 요청을 가장 먼저 가로챔 
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
    throws ServletException, IOException {

        String jwt = resolveToken(request);

        System.out.println("doFilterInternal==="+jwt);
        // validateToken 으로 토큰 유효성 검사 
        if (StringUtils.hasText(jwt) && jwtProvier.validateToken(jwt)) {
             // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
            Authentication authentication = jwtProvier.getAuthentication(jwt);
            System.out.println("authentication==="+authentication);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
   // jwt 토큰의 인증정보를 SecurityContext에 저장하는 역할 수행 로직
   // client 요청을 가장 먼저 가로챔 
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
//          throws IOException, ServletException {

//             // Request Header 에서 JWT 토큰 추출 
//             String token = resolveToken((HttpServletRequest) servletRequest);

//             // validateToken 으로 토큰 유효성 검사 
//             if (token != null && jwtProvier.validateToken(token)){
//                 // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
//                 Authentication authentication = jwtProvier.getAuthentication(token);
//                 SecurityContextHolder.getContext().setAuthentication(authentication);
//             } 
//             filterChain.doFilter(servletRequest, servletResponse);
//         }

            // HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
            // String jwt = resolveToken(httpServletRequest);
            // String requestURI = httpServletRequest.getRequestURI();
    
            // if (StringUtils.hasText(jwt) && jwtProvier.validateToken(jwt)) {
            //     Authentication authentication = jwtProvier.getAuthentication(jwt);
            //     SecurityContextHolder.getContext().setAuthentication(authentication);
            //     logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
            // } else {
            //     logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
            // }
    
            // filterChain.doFilter(servletRequest, servletResponse);
      

   // @Override
   // protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
   //       throws ServletException, IOException {
   //          // 1. Request Header 에서 토큰을 꺼낸다.
   //          String jwt = resolveToken(request);

   //          // 2. validateToken 으로 토큰 유효성 검사를 실시
   //          // 정상 토큰이면 해당 토큰으로 Authentication 을 가져와서 SecurityContext 에 저장한다.
   //          if (StringUtils.hasText(jwt) && jwtProvier.validateToken(jwt)) {
   //              Authentication authentication = jwtProvier.getAuthentication(jwt);
   //              SecurityContextHolder.getContext().setAuthentication(authentication);
   //          }
    
   //          filterChain.doFilter(request, response);
      
   // }
    // private final JwtTokenUtil jwtTokenUtil;
    // private final PrincipalDetailsService principalDetailsService;



    // @Override
    // protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    //         throws ServletException, IOException {
            
    //         final String requestTokenHeader = request.getHeader("Authorization");
            
    //         System.out.println("====requestTokenHeader===="+requestTokenHeader);

    //         String username = null;
    //         String jwtToken = null;

    //         if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
    //             jwtToken = requestTokenHeader.substring(7);
    //             System.out.println("===jwtToken==="+jwtToken);
    //             try {
    //             System.out.println(jwtTokenUtil.getUsernameFromToken(jwtToken)+"===============");
    //                 username = jwtTokenUtil.getUsernameFromToken(jwtToken);
    //                 System.out.println("==username-="+username);
    //             } catch (IllegalArgumentException e) {
    //                 System.out.println("Unable to get JWT Token");
    //             } catch (ExpiredJwtException e) {
    //                 System.out.println("JWT Token has expired");
    //             }
    //         } else {
    //             logger.warn("JWT Token does not begin with Bearer String");
    //         }

    //         if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
    //             System.out.println("?????????username>>>>>>>>"+username);
    //             UserDetails userDetails = this.principalDetailsService.loadUserByUsername(username);
    
    //             // if token is valid configure Spring Security to manually set
    //             // authentication
    //             if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
    
    //                 UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
    //                     userDetails, null, userDetails.getAuthorities());
    //                 usernamePasswordAuthenticationToken
    //                     .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    //                 // After setting the Authentication in the context, we specify
    //                 // that the current user is authenticated. So it passes the
    //                 // Spring Security Configurations successfully.
    //                 SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    //                 System.out.println("usernamePasswordAuthenticationToken??"+usernamePasswordAuthenticationToken);
    //             }
    //         }
    //         filterChain.doFilter(request, response);
    //     }

    

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
