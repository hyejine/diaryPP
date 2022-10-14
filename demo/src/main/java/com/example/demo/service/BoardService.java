package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.dao.BoardMapper;
import com.example.demo.model.dto.DiaryDto;
import com.example.demo.model.dto.EmojiImageDto;

@Service
public class BoardService implements BoardMapper{
    private final BoardMapper boardMapper;

	public BoardService(BoardMapper boardMapper){
        this.boardMapper = boardMapper;
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

    // @Override
    // public List<DiaryDto> getBoard() {
        
    //     return boardMapper.getBoard();
    // } 

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
    public List<DiaryDto> getBoard(Long id) {
        return  boardMapper.getBoard(id);
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
    public List<DiaryDto> getMonthProgress(String month) {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy"); 
        String formatDate = format.format(now); 
        String sendFormatDate = formatDate + "-" + month;
        
            return boardMapper.getMonthProgress(sendFormatDate);
    }

    // @Override
    // public List<DiaryDto> getOneDiary(Long id) {
    //     // TODO Auto-generated method stub
    //     return null;
    // }
}
