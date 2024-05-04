package com.sustainability.mvp.controller;


import com.sustainability.mvp.entity.Trivia;
import com.sustainability.mvp.service.TriviaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class TriviaController {
    @Autowired
    private TriviaService triviaService;

/**
 * Saves a trivia object in the firebase.
 * @param trivia Trivia object to be saved.
 * @return The update time as a string after saving the trivia.
 * */
    @PostMapping("/Trivia")
    public String saveTrivia(@RequestBody Trivia trivia) throws ExecutionException, InterruptedException {

        return triviaService.saveTrivia(trivia);
    }

/**
 * Retrieves a trivia object by user ID.
 * @param userID The user ID associated with the trivia.
 * @return Trivia object corresponding to the userID.
 * */
    @GetMapping("/Trivia/{userID}")
    public Trivia getTrivia(@PathVariable String userID) throws ExecutionException, InterruptedException {
        return triviaService.getTriviaDetailsByName(userID);
    }

/**
 * Retrieves all trivia objects from the database.
 * @return A list of all trivia objects.
 * */
    @GetMapping("/Trivia")
    public List<Trivia> getAllProducts() throws ExecutionException, InterruptedException {
        return triviaService.getTriviaDetails();
    }

//    @PutMapping("/Trivia")
//    public String update(@RequestBody Trivia trivia) throws ExecutionException, InterruptedException {
//        return triviaService.updateTriviaUserid(trivia);
//    }
//
//    @DeleteMapping("/Trivia/{userID}")
//    public String deleteTriviaUser(@PathVariable String userid) throws ExecutionException, InterruptedException {
//        return triviaService.deleteTriviaUser(userid);
//    }

}
