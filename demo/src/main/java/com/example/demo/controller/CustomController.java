package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.entity.CustomEntity;
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
	public void postFont(@RequestBody CustomEntity data) {
		System.out.println("======value====" + data);
		customService.postFont(data);
		// return "data";
		// return customService.postFont(data);
	}
}
