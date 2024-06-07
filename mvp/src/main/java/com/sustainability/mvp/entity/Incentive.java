package com.sustainability.mvp.entity;

import java.util.List;

public class Incentive {
    public String type; //saves the specific type of incentive, like (cool,solar,utility, water,transportation, roof)
    public String facts;
    public String photo;
    public List<String> actions; //saves the option of actions user decides to take, from the variety of tv ac, washer+drier, vacuum cleaner
    public String dailyNote;
    public String userID; //saves userid to reference from user profile

    public String getUserID(){ return userID; }
    public void setUserID(String userID){ this.userID = userID;}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public List<String> getActions() {
        return actions;
    }

    public void setActions(List<String> actions) {
        this.actions = actions;
    }
    public String getFacts() {
        return facts;
    }

    public void setFacts(String facts) {
        this.facts = facts;
    }
    public String getPhoto(){
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
    public String getDailyNote() {
        return dailyNote;
    }

    public void setDailyNote(String dailyNote) {
        this.dailyNote = dailyNote;
    }


}
