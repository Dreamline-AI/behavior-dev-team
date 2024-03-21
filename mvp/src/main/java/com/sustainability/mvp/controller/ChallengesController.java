package com.sustainability.mvp.controller;

import com.sustainability.mvp.entity.Challenges;
import com.sustainability.mvp.service.ChallengesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
class ChallengesController {

    @Autowired
    private ChallengesService challengesService;



    @PostMapping("/challenges")
    public String saveChallenge(@RequestBody Challenges challenge) throws ExecutionException, InterruptedException {
        return challengesService.saveChallenge(challenge);
    }

    @GetMapping("/challenges/{challengeGroup}")
    public Challenges getChallengeByGroup(@PathVariable String challengeGroup) throws ExecutionException, InterruptedException {
        return challengesService.getChallengeByGroup(challengeGroup);
    }

    @GetMapping("/challenges/{challengeId}")
    public Challenges getChallengeById(@PathVariable String challengeID) throws ExecutionException, InterruptedException {
        return challengesService.getChallengeById(challengeID);
    }

    @PutMapping("/challenges")
    public String update(@RequestBody Challenges challenge) throws ExecutionException, InterruptedException {
        return challengesService.updateChallenge(challenge);
    }


}
