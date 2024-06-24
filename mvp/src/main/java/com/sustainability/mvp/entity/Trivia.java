//package com.sustainability.mvp.entity;
//
//import java.util.List;
//
//public class Trivia {
//
//    private String triviaId;
//    private List<String> questionsId;
//    private List<TriviaQuestions> questions; // Added to hold detailed question information
//
//    // Getters and setters for triviaId and questionsId
//
//    public List<TriviaQuestions> getQuestions() {
//        return questions;
//    }
//
//    public void setQuestions(List<TriviaQuestions> questions) {
//        this.questions = questions;
//    }
//}
//
//
package com.sustainability.mvp.entity;

import java.util.List;

public class Trivia {

    private String triviaId;
    private List<String> questionsId;
    private List<TriviaQuestions> questions; // Added to hold detailed question information

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

    public List<TriviaQuestions> getQuestions() {
        return questions;
    }

    public void setQuestions(List<TriviaQuestions> questions) {
        this.questions = questions;
    }
}

