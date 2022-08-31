package com.example.demo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
// @NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String email;
    private String nickname;

    public static MemberResponseDto of(userDto member) {
        return MemberResponseDto.builder()
                .email(member.getUser_email())
                .nickname(member.getUser_name())
                .build();
    }
}