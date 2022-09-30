package com.example.demo.service;

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
    public List<DiaryDto> getBoard() {
        // pk 
        return boardMapper.getBoard();
    }

    @Override
    public DiaryDto deleteBoard(Long id) {
        // TODO Auto-generated method stub
        return null;
    }
}
