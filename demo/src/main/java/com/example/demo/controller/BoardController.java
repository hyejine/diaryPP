package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/board")
public class BoardController {

    @PostMapping("/register/imageUpload")
    public ResponseEntity<Object> uploadTestPOST(MultipartFile[] uploadFile) {

        System.out.println("uploadFile: "+uploadFile);
        
        // 내가 업로드 파일을 저장할 경로
        String uploadFolder = "C:\\dairyData";
        SimpleDateFormat sdt = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String formatDate = sdt.format(date);

        String datePath = formatDate.replace("-", File.separator);

        File uploadPath = new File(uploadFolder, datePath);

        // 해당 경로의 폴더가 존재하지 않을 경우
        if (uploadPath.exists() == false) {
            uploadPath.mkdirs(); // 해당 경로의 폴더 생성
        }
        for (MultipartFile multipartFile : uploadFile) {

            String uploadFileName = multipartFile.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();
            uploadFileName = uuid + "_" + uploadFileName;
            // 저장할 파일, 생성자로 경로와 이름을 지정해줌.
            File saveFile = new File(uploadPath, uploadFileName);

            try {
                // void transferTo(File dest) throws IOException 업로드한 파일 데이터를 지정한 파일에 저장
                multipartFile.transferTo(saveFile);
                return new ResponseEntity<Object>(uploadFileName, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                }
            }
        return null;
            
}

}
