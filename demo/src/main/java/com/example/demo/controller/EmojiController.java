package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dao.EmojiMapper;
import com.example.demo.model.dto.EmojiDto;
import com.example.demo.model.dto.EmojiImageDto;
import com.example.demo.service.EmojiService;

@RestController
@RequestMapping("/emoji")
public class EmojiController {
    private final EmojiService emojiService;
    private final EmojiMapper emojiMapper;

    public EmojiController(EmojiService emojiService, EmojiMapper emojiMapper){
        this.emojiService = emojiService;
        this.emojiMapper = emojiMapper;
    }

    @GetMapping("/getEmojiList")
    public List<EmojiDto> getEmojiList() {
        return emojiMapper.getEmojiList();
    }

    @GetMapping("/{emojiType}")
    public List<EmojiDto> getEmojiType(@PathVariable("emojiType") String emojiType) {
        return emojiMapper.getEmojiImage(emojiType);
    }

    @GetMapping("/getEmojiId/{emojiId}")
    public EmojiImageDto getEmoji(@PathVariable("emojiId") Long emojiId) {
        return emojiMapper.getEmoji(emojiId);
    }
    @GetMapping("/postFont/{fontChange}")
	public String postFont(@PathVariable ("fontChange") String data) {
		System.out.println("======value===="+data);
		// customService.postFont(data);
		return "data"+data;
	}
}
