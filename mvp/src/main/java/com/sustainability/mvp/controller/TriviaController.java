package com.sustainability.mvp.controller;

import com.sustainability.mvp.entity.TriviaQuestionDTO;
import com.sustainability.mvp.service.TriviaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

// This annotation marks the class as a Spring REST controller
@RestController

// Requests to the controller will be prefixed with "/api"
@RequestMapping("/api")

// Allows cross-origin requests from the specified URL
@CrossOrigin("http://localhost:19006/")
public class TriviaController {

    // This automatically injects the TriviaService instance
    @Autowired
    private TriviaService triviaService;

    // This method handles GET requests to "/api/questions"
    @GetMapping("/questions")
    public List<TriviaQuestionDTO> getTriviaData() throws ExecutionException, InterruptedException {
        // Fetches a random trivia ID
        String randomTriviaId = triviaService.getRandomTriviaId();
        // Uses the random trivia ID to get the list of trivia questions and returns it
        return triviaService.findQuestionsList(randomTriviaId);
    }
}
