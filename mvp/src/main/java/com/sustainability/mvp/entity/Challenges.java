package com.sustainability.mvp.entity;

public class Challenges {

    private String answer;
    private String challengeGroup;
    private String challengeID;
    private String content;
    private String option;

    public Challenges() {
    }

    public Challenges(String answer,
                      String challengeGroup,
                      String content,
                      String option){}

    public Challenges(String answer,
                      String challengeGroup,
                      String challengeID,
                      String content,
                      String option){
        this.answer = answer;
        this.challengeGroup = challengeGroup;
        this.challengeID = challengeID;
        this.content = content;
        this.option = option;

    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getChallengeGroup() {
        return challengeGroup;
    }

    public void setChallengeGroup(String challengeGroup) {
        this.challengeGroup = challengeGroup;
    }

    public String getChallengeID() {
        return challengeID;
    }

    public void setChallengeID(String challengeID) {
        this.challengeID = challengeID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

    @Override
    public String toString() {
        return "Challenges{" +
                "answer='" + answer + '\'' +
                ", challengeGroup='" + challengeGroup + '\'' +
                ", challengeID=" + challengeID +
                ", content='" + content + '\'' +
                ", option='" + option + '\'' +
                '}';
    }
}
