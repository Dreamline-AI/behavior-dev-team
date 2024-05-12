package com.sustainability.mvp.entity;

import java.util.List;

public class Trivia {

    private String triviaId;
    private List<String> questionsId;

    public String getTriviaId() {
        return triviaId;
    }

    public void setTriviaId(String triviaId) {
        this.triviaId = triviaId;
    }

    public List<String> getQuestionsId() {
        return questionsId;
    }

    public void setQuestionsId(List<String> questionsId) {
        this.questionsId = questionsId;
    }
}
