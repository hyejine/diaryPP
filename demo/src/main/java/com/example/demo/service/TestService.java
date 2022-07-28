package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dao.TestMapper;
import com.example.demo.model.dto.testDto;

@Service
public class TestService {

    @Autowired
    public TestMapper testMapper;

    public void write(testDto value){
        System.out.println(value.getTitle());
        System.out.println(value.getContent());

        testMapper.write(value); 
    }

    public List<testDto> getDB(){
        return testMapper.getDB();
    }
    
}
