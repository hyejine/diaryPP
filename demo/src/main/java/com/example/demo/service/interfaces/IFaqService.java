package com.example.demo.service.interfaces;

import java.util.List;

import com.example.demo.model.dto.SearchDto;
import com.example.demo.model.entity.FaqEntity;

public interface IFaqService {

    public List<FaqEntity> searchData(SearchDto value);

}
