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
    public List<DiaryDto> getMonthBoard() {

        return boardMapper.getMonthBoard();
    }

    @Override
    public DiaryDto deleteBoard(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<DiaryDto> getBoard(Long id, String email) {
        // String currentUser = userService.getCurrentUser(null);
        return boardMapper.getBoard(id, email);
    }

    @Override
    public List<DiaryDto> getMonth(String month) {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy");
        String formatDate = format.format(now);
        String sendFormatDate = formatDate + "-" + month;
        return boardMapper.getMonth(sendFormatDate);
    }

    @Override
    public List<DiaryDto> getMonthProgress(DiaryDto data) {
        if (data.getDiary_date().length() > 2) {
            System.out.println("data===" + data.getDiary_date() + data.getUser_email());
            return boardMapper.getYearProgress(data);
        } else {
            Date now = new Date();
            SimpleDateFormat format = new SimpleDateFormat("yyyy");
            String formatDate = format.format(now);
            String sendFormatDate = formatDate + "-" + data.getDiary_date();
            return boardMapper.getMonthProgress(sendFormatDate, data.getUser_email());
        }
    }

    @Override
    public List<DiaryDto> getYear(String year) {
        return boardMapper.getYear(year);
    }
}
