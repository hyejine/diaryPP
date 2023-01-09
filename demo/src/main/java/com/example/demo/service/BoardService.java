package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.dao.BoardMapper;
import com.example.demo.model.dto.SearchDto;
import com.example.demo.model.entity.DiaryDto;
import com.example.demo.model.entity.EmojiImageDto;
import com.example.demo.service.interfaces.IBoardService;

@Service
public class BoardService implements IBoardService {
    private final BoardMapper boardMapper;
    private final UserService userService;

    public BoardService(BoardMapper boardMapper, UserService userService) {
        this.boardMapper = boardMapper;
        this.userService = userService;

    }

    @Override
    public int saveQuill(DiaryDto data) {
        boardMapper.saveQuill(data);
        return data.getDiary_id();
    }

    @Override
    public int updateQuill(DiaryDto data) {
        boardMapper.updateQuill(data);
        return data.getDiary_id();
    }

    @Override
    public List<DiaryDto> getMonthBoard(String email) {

        return boardMapper.getMonthBoard(email);
    }

    @Override
    public DiaryDto deleteBoard(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<DiaryDto> getBoard(DiaryDto data) {
        // String currentUser = userService.getCurrentUser(null);
        return boardMapper.getBoard(data);
    }

    @Override
    public List<DiaryDto> getMonth(String month, String email) {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy");
        String formatDate = format.format(now);
        if (month.length() == 1) {
            month = "0" + month;
        }
        String sendFormatDate = formatDate + "-" + month;
        return boardMapper.getMonth(sendFormatDate, email);
    }

    @Override
    public List<DiaryDto> getMonthProgress(DiaryDto data) {
        if (data.getDiary_date().length() > 2) {
            return boardMapper.getYearProgress(data);
        } else {
            Date now = new Date();
            SimpleDateFormat format = new SimpleDateFormat("yyyy");
            String formatDate = format.format(now);
            String month = data.getDiary_date();
            if (month.length() == 1) {
                month = "0" + month;
            }
            String sendFormatDate = formatDate + "-" + month;
            System.out.println("sendFormatDate===" + sendFormatDate + "===" + data.getUser_email());
            return boardMapper.getMonthProgress(sendFormatDate, data.getUser_email());
        }
    }

    @Override
    public List<DiaryDto> getYear(String year, String email) {
        return boardMapper.getYear(year, email);
    }
}
