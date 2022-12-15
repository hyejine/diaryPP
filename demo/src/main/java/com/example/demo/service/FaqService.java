package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dao.FaqMapper;
import com.example.demo.model.dto.SearchDto;
import com.example.demo.model.entity.FaqEntity;
import com.example.demo.service.interfaces.IFaqService;

@Service
public class FaqService implements IFaqService {
    private final FaqMapper faqMapper;

    @Autowired
    public FaqService(FaqMapper faqMapper) {
        this.faqMapper = faqMapper;
    }

    @Override
    public List<FaqEntity> searchData(SearchDto value) {
        System.out.println("value==" + value.getSearchKeyWord());
        System.out.println(value.getSelectContent() + value.getSelectCategory());
        return faqMapper.searchData(value);
    }
}
