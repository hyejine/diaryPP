package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.testDto;
import com.example.demo.service.TestService;

@RestController
public class TestController {

    @Autowired
    public TestService testService;
    
    @PostMapping("/api/write")
    public void writeBoard(@RequestBody testDto value){
        testService.write(value);
    }

    @GetMapping("/api/getDB")
    public String getDB() {
        return testService.getDB();
    }
}
