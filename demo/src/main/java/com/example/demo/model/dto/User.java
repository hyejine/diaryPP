package com.example.demo.model.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
// @Builder
public class User{
    
    public Integer id;

    public String user_email;

    public String user_name;

    public String user_password;

    public String user_hashPassword;

    public String user_phone;

    public String user_image;

    public Date user_create;

    public String sns_id;
 
    public String sns_type;

    public String user_type;

    public List<String> getRoleList(){
        if(this.user_type.length()>0){
            return Arrays.asList(this.user_type.split(","));
        }
        return new ArrayList<>();
    }

    // @Builder
    // public userDto(Integer id, String user_email, String user_name, String user_password, String user_hashPassword, String user_phone, String user_image,  Date user_create
    // , String sns_id, String sns_type, UserType user_type) {
    // this.id= id;
    // this.user_email = user_email;
    // this.user_name = user_name;
    // this.user_password = user_password;
    // this.user_hashPassword = user_hashPassword;
    // this.user_phone = user_phone;
    // this.user_image = user_image;
    // this.user_create = user_create;
    // this.sns_id = sns_id;
    // this.sns_type = sns_type;
    // this.user_type = user_type;
// }
}
