package com.sustainability.mvp.entity;

import java.util.HashMap;
import java.util.Map;



public class User {
    private String UserID;
    private String firstName;
    private String lastName;
    private String email;
    private String zipcode;
    private String password;
    

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserID() {
        return UserID;
    }

    public void setUserID(String userID) {
        UserID = userID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public Map<String, Object> getUserBasicInfo() {
        Map<String, Object> basicInfo = new HashMap<>();
        basicInfo.put("firstName", this.firstName);
        basicInfo.put("lastName", this.lastName);
        basicInfo.put("email", this.email);
        basicInfo.put("UserID", this.UserID);
        basicInfo.put("password", this.password);  
        return basicInfo;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }
}