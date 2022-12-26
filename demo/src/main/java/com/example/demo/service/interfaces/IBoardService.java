package com.example.demo.service.interfaces;

import java.util.List;

import com.example.demo.model.dto.SearchDto;
import com.example.demo.model.entity.DiaryDto;

public interface IBoardService {

    public int saveQuill(DiaryDto data);

    public int updateQuill(DiaryDto data);

    public List<DiaryDto> getMonthBoard();

    public DiaryDto deleteBoard(Long id);

    public List<DiaryDto> getBoard(Long id, String email);

    public List<DiaryDto> getMonth(String month);

    public List<DiaryDto> getMonthProgress(DiaryDto data);

    public List<DiaryDto> getYear(String year);
}
