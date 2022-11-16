// package com.example.demo.model.dto.auth;

// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import com.example.demo.model.dto.UserDto;

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class AccountRequestDTO {

//     private String email;
//     private String password;
//     private String name;

//     public UserDto toAccount(PasswordEncoder passwordEncoder) {
//         return UserDto.builder()
//                 .user_email(email)
//                 .user_password(passwordEncoder.encode(password))
//                 .user_name(name)
//                 .user_type("ROLE_USER")
//                 .build();
//     }

//     public UsernamePasswordAuthenticationToken toAuthentication() {
//         return new UsernamePasswordAuthenticationToken(email, password);
//     }
// }