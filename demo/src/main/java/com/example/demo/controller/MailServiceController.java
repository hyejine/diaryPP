package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.entity.EmailContentDto;
import com.example.demo.service.MailService;

@RestController
@RequestMapping("/mail")
public class MailServiceController {
    
    private final MailService mailService;

	@Autowired
	public MailServiceController(MailService mailService) {
		this.mailService = mailService;
	}

    @PostMapping("/postContactUs")
    public void postContactUs(@RequestBody EmailContentDto data) {

		mailService.postContactUs(data);
		// return "data";
		// return customService.postFont(data);
	}
}
