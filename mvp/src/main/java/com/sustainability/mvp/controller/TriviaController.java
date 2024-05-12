package com.sustainability.mvp.controller;

import com.sustainability.mvp.entity.Trivia;
import com.sustainability.mvp.service.TriviaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/trivia")
public class TriviaController {

    @Autowired
    private TriviaService triviaService;

    public Trivia getTriviaData(String triviaId) throws ExecutionException, InterruptedException {
        return triviaService.findQuestionsList(triviaId);
    }

}
