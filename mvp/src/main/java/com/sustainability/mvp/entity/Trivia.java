package com.sustainability.mvp.entity;

import java.util.List;

public class Trivia {
    private String question;
    private String answer;
    private boolean correctness; //saves the correctness so that when the correctness is false, the following question can be used for revision
    private List<String> option; //the set of option of answers
    private String explanation; //explanation for the answer
    private String userID; //references the userid to get all the revision questions for each user

    // Getters and setters with correct capitalization
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public boolean isCorrectness() { // convention for boolean getters is to use 'is' instead of 'get'
        return correctness;
    }

    public void setCorrectness(boolean correctness) {
        this.correctness = correctness;
    }

    public List<String> getOption() {
        return option;
    }

    public void setOption(List<String> option) {
        this.option = option;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
}
