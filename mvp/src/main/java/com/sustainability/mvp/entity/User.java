package com.sustainability.mvp.entity;

public class User {
    private String userID;
    private String firstName;
    private String lastName;
    private String email;
    private String zipcode;
    private String password;
    private Integer voltCoins = 15;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
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

    public Integer getVoltCoins() {
        return voltCoins;
    }

    public void setVoltCoins(Integer voltCoins) {
        this.voltCoins = voltCoins;
    }

}