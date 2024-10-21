package com.sustainability.mvp.entity;

public class Profile {
    private String avatar;
    private Integer bestStreak;  //saves the best streak the user had so far
    private String firstName;
    private String lastName;
    private Integer rankProgress; //saves the rank progress in a percentage, like 0.99
    private String rankTitle; //saves the current rank title of a user
    private Integer rewards;
    private Integer streak;
    private String userID;
    private Integer voltCoins = 15;

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getBestStreak() {
        return bestStreak;
    }

    public void setBestStreak(Integer bestStreak) {
        this.bestStreak = bestStreak;
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

    public Integer getRankProgress() {
        return rankProgress;
    }

    public void setRankProgress(Integer rankProgress) {
        this.rankProgress = rankProgress;
    }

    public String getRankTitle() {
        return rankTitle;
    }

    public void setRankTitle(String rankTitle) {
        this.rankTitle = rankTitle;
    }

    public Integer getRewards() {
        return rewards;
    }

    public void setRewards(Integer rewards) {
        this.rewards = rewards;
    }

    public Integer getStreak() {
        return streak;
    }

    public void setStreak(Integer streak) {
        this.streak = streak;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public Integer getVoltCoins() {
        return voltCoins;
    }

    public void setVoltCoins(Integer voltCoins) {
        this.voltCoins = voltCoins;
    }


}
