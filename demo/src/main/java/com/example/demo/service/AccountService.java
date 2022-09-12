package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.config.SecurityUtil;
import com.example.demo.model.dao.AccountRepository;
import com.example.demo.model.dto.auth.AccountResponseDTO;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor 
@Service
public class AccountService {

    @Autowired
    public AccountRepository accountRepository;

    // public void write(testDto value){
    //     testMapper.write(value); 
    // }

    // public List<testDto> getDB(){
    //     return testMapper.getDB();
    // }
    @Transactional(readOnly = true)
    public AccountResponseDTO getAccountInfo(String email) {
        return accountRepository.findByEmail(email)
                .map(AccountResponseDTO::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 존재하지 않습니다. "));
    }

    // 현재 SecurityContext 에 있는 Account 정보 가져오기
    @Transactional(readOnly = true)
    public AccountResponseDTO getMyAccountInfo() {
        return accountRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(AccountResponseDTO::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다. "));
    }
    
}
