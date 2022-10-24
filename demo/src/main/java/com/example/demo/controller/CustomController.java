package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.CustomDto;
import com.example.demo.service.CustomService;

@RestController
@RequestMapping("/custom")
public class CustomController {

    private final CustomService customService;
    
    @Autowired
    public CustomController(CustomService customService) {
		this.customService = customService;
	}

    /**
	 * 선택한 폰트 저장
	 *
	 * @param fontChange
	 * @return custom_table 
	 */
    @PostMapping("/postFont/{fontChange}")
	public CustomDto postFont(@PathVariable("fontChange") CustomDto value) {
		return customService.postFont(value);
	}
}
