package com.example.demo.model.dto;


public enum  UserType { 
    ADMIN("00"),
    USER("01") ;
    
    private String code;

    UserType(String code){
        this.code = code;
    }

    public String getCode(){
        return code;
    }

}
