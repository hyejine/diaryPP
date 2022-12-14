package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dao.FaqMapper;
import com.example.demo.model.dto.SearchDto;
import com.example.demo.model.entity.FaqEntity;
import com.example.demo.service.FaqService;

@RestController
@RequestMapping("/faq")
public class FaqController {
    private final FaqService faqService;
    private final FaqMapper faqMapper;

    public FaqController(FaqService faqService, FaqMapper faqMapper) {
        this.faqService = faqService;
        this.faqMapper = faqMapper;
    }

    @GetMapping("/getAllFaq")
    public List<FaqEntity> getAllFaq() {
        return faqMapper.getAllList();
    }

    @PostMapping("/searchData")
    public List<FaqEntity> searchData(@RequestBody SearchDto value) {
        return faqService.searchData(value);
    }
}
