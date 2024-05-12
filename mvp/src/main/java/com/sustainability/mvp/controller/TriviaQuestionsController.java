package com.sustainability.mvp.controller;

import com.sustainability.mvp.entity.Trivia;
import com.sustainability.mvp.entity.TriviaQuestions;
import com.sustainability.mvp.service.TriviaQuestionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("triviaQuestions")
public class TriviaQuestionsController {

    @Autowired
    private TriviaController triviaController;

    @Autowired
    private TriviaQuestionsService triviaQuestionsService;

    @GetMapping("/questionsList")
    public TriviaQuestions getQuestion(@RequestParam String triviaId, @RequestParam String questionId) throws ExecutionException, InterruptedException {

        Trivia trivia = triviaController.getTriviaData(triviaId);
        if (questionId.isEmpty()) {
            System.out.println("vbnm");
            return triviaQuestionsService.findQuestionById(trivia.getQuestionsId().get(0));
        }
        for (int i=0; i<trivia.getQuestionsId().size()-1; i++) {
             if (questionId.equals(trivia.getQuestionsId().get(i))) {
                 return triviaQuestionsService.findQuestionById(trivia.getQuestionsId().get(i+1));
             }
        }

        return null;
    }


}
