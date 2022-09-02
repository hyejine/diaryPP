package com.example.demo.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.dao.MemberRepository;
import com.example.demo.model.dto.Member;

@Service
public class AuthDetailsService implements UserDetailsService{

    @Autowired
    private MemberRepository authMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(username == null || username.equals("")) {
			throw new UsernameNotFoundException(username);
		}
        Member userEntity = authMapper.getId(username);
        if(userEntity == null) {
			throw new UsernameNotFoundException(username);
		}
        return new AuthDetails(userEntity);
        // userDto userEntity = authMapper.getId(email);
        // if(userEntity != null){
        //     return new AuthDetails(userEntity);
        // }
        // return (UserDetails) new UsernameNotFoundException(email);
    }
    
}
