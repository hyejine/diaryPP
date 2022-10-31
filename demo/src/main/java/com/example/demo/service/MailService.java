package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.EmailDto;
import com.example.demo.service.interfaces.IMailService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailService implements IMailService{

    @Autowired
    private JavaMailSender javaMailSender;
    private static final String FROM_ADDRESS = "diaryMail.jung";

    // @Autowired

    // @Override
    // public void postContactUs(EmailDto data) {
    //     try{
    //         MailSender mailSender = new MailSender(javaMailSender);

    //         mailSender.setTo(MailService.FROM_ADDRESS);
    //         mailSender.setFrom(data.getUseEmail());
    //         String htmlContent = "<p>" + data.getContactUs() + "<p> <img src='cid:sample-img'>";
    //         mailSender.setText(htmlContent, true);

    //         System.out.println(mailSender);

    //         System.out.println(mailSender);
    //         mailSender.send();
    //     }
    //     catch(Exception e){
    //         e.printStackTrace();
    //     }
    // }

    @Override
    public void postContactUs(EmailDto data) {
        
    }
    
}
