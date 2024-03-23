package com.sustainability.mvp.controller;

import com.sustainability.mvp.entity.Challenges;
import com.sustainability.mvp.service.ChallengesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
class ChallengesController {

    @Autowired
    private ChallengesService challengesService;



    @PostMapping("/saveChallenge")
    public String saveChallenge(@RequestBody Challenges challenge) throws ExecutionException, InterruptedException {
        return challengesService.saveChallenge(challenge);
    }

    @GetMapping("/challenges")
    public List<Challenges> getAllChallenges() throws ExecutionException, InterruptedException {
        return challengesService.getChallengeINFO();
    }

    @GetMapping("/challenges/{challengeGroup}")
    public Challenges getChallengeById(@PathVariable String challengeGroup) throws ExecutionException, InterruptedException {
        return challengesService.getChallengeById(challengeGroup);
    }

    @PutMapping("/challenges")
    public String update(@RequestBody Challenges challengeID) throws ExecutionException, InterruptedException {
        return challengesService.updateChallenge(challengeID);
    }


}
