package com.example.demo.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.model.dao.MailTemplateMapper;
import com.example.demo.model.dto.EmailContentDto;
import com.example.demo.model.dto.MailTemplateDto;
import com.example.demo.service.interfaces.IMailService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailService implements IMailService{
    private JavaMailSender javaMailSender;
    private static final String FROM_ADDRESS = "diaryMail.jung@gmail.com";
    private final MailTemplateMapper mailTemplateMapper;

    @Autowired
    public MailService(MailTemplateMapper mailTemplateMapper, JavaMailSender javaMailSender){
        this.mailTemplateMapper = mailTemplateMapper;
        this.javaMailSender =javaMailSender;
    }

    @Override
    public void sendMail(String to, String subject, String text){
        try{
        MailSender mailSender = new MailSender(javaMailSender);
        // SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        System.out.println(mailSender);
        mailSender.setTo(MailService.FROM_ADDRESS);
        mailSender.setSubject(subject);
        // String htmlContent = "<p>" + data.getContactUs() + "<p> <img src='cid:sample-img'>";
        mailSender.setText(text, true);
        mailSender.send();
    }
    catch(Exception e){
        e.printStackTrace();
    }

    }

    private String buildEmailContent(String templateName, String[][] objectMap){

        MailTemplateDto emailTemplate = mailTemplateMapper.getEmailContent(templateName);
        String emailTemplateContent = emailTemplate.getTemplate_content();

        return emailTemplateContent;
        
    }

    @Override
    public void postContactUs(EmailContentDto data) {

        System.out.println("postContactUs==="+data.getContactUs());
        this.sendMail(data.getUseEmail(), "diary 문의메일", 
            buildEmailContent("contactUs",
            new String[][]{
                { "{%NAME%}", data.getContactUs() }
            }
            )
        );
        // try{
        //     ArrayList<String> toFromList = new ArrayList<>();

        //     MailSender mailSender = new MailSender(javaMailSender);

        //     mailSender.setTo(MailService.FROM_ADDRESS);
        //     mailSender.setFrom(data.getUseEmail());
        //     mailSender.setSubject("diary 문의메일");
        //     String htmlContent = "<p>" + data.getContactUs() + "<p> <img src='cid:sample-img'>";
        //     mailSender.setText(htmlContent, true);

        //     System.out.println(mailSender);

        //     System.out.println(mailSender);
        //     mailSender.send();
        // }
        // catch(Exception e){
        //     e.printStackTrace();
        // }
    }

    // @Override
    // public void postContactUs(EmailDto data) {

    //     ArrayList<String> toFromList = new ArrayList<>();

    //     toFromList.add("hyejine1997@naver.com");
    //     int toFromSize = toFromList.size();

    //     SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    //     simpleMailMessage.setTo((String[]) toFromList.toArray(new String[toFromSize]));
    //     simpleMailMessage.setText(data.getContactUs());

    //     javaMailSender.send(simpleMailMessage);

        
    // }
    
}
