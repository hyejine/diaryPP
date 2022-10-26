package com.example.demo.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.dao.BoardMapper;
import com.example.demo.model.dto.CustomDto;
import com.example.demo.model.dto.DiaryDto;
import com.example.demo.service.BoardService;
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
	 * 글꼴 저장 
	 *
	 * @param custom_font
	 * @return insert or update custom_font
	 */

	@PostMapping("/postFont")
	public void postFont(@RequestBody CustomDto data) {
		System.out.println("======value===="+data);
		customService.postFont(data);
		// return "data";
		// return customService.postFont(data);
	}
}
