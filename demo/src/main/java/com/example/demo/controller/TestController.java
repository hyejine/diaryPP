package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.testDto;
import com.example.demo.service.TestService;

@RestController
public class TestController {

    @Autowired
    private TestService testService;
    
    @PostMapping("/api/write")
    public void writeBoard(testDto value){
        System.out.println(value.getTitle());
        System.out.println(value.getContent());

        testService.write(value);
    }

    @GetMapping("getDB")
    public List<testDto> getDB() {
        return testService.getDB();
    }
}
