package com.example.demo.controller;

import java.io.File;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/board")
public class BoardController {

    @PostMapping("/register/imageUpload")
    public void uploadTestPOST(MultipartFile[] uploadFile) {

        System.out.println(uploadFile);
        // 내가 업로드 파일을 저장할 경로
        String uploadFolder = "C:\\Users\\Data-Logics\\Pictures\\testDiaryBoard";
        for (MultipartFile multipartFile : uploadFile) {
            String uploadFileName = multipartFile.getOriginalFilename();
            // 저장할 파일, 생성자로 경로와 이름을 지정해줌.
            File saveFile = new File(uploadFolder, uploadFileName);

            try {
                // void transferTo(File dest) throws IOException 업로드한 파일 데이터를 지정한 파일에 저장
                multipartFile.transferTo(saveFile);    
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
}
}
