package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.auth.AccountResponseDTO;
import com.example.demo.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {

     // Logger
     private final Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());

     // Dependency Injection
     private final BCryptPasswordEncoder bCryptPasswordEncoder;
     private final AccountService accountService;
 
     // DI using Constructor
     public AccountController(BCryptPasswordEncoder bCryptPasswordEncoder, AccountService accountService) {
         this.bCryptPasswordEncoder = bCryptPasswordEncoder;
         this.accountService = accountService;
     }
 
     @GetMapping("/me")
     public ResponseEntity<AccountResponseDTO> getMyAccountInfo() {
         return ResponseEntity.ok(accountService.getMyAccountInfo());
     }
 
     @GetMapping("/{email}")
     public ResponseEntity<AccountResponseDTO> getAccountInfo(@PathVariable("email") String email) {
        System.out.println("1. email" +email);
         return ResponseEntity.ok(accountService.getAccountInfo(email));
     }

     
    // @Autowired
    // public TestService testService;
    
    // @PostMapping("/api/write")
    // public void writeBoard(@RequestBody testDto value){
    //     testService.write(value);
    // }

    // @GetMapping("/api/getDB")
    // public String getDB() {
    //     return testService.getDB();
    // }
}
