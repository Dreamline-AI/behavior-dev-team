package com.sustainability.mvp.controller;

import com.sustainability.mvp.entity.Incentive;
import com.sustainability.mvp.service.IncentiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
class IncentiveController {
    @Autowired
    private IncentiveService incentiveService;

    /**
     * Create a new incentive.
     * @param incentive The Incentive object to be saved, passed in the request body.
     * @return A string indicating the update timestamp upon successful save.
 * */
    @PostMapping("/incentives")
    public String saveIncentive(@RequestBody Incentive incentive) throws ExecutionException, InterruptedException {
        return incentiveService.saveIncentive(incentive);
    }
/**
 * Retrieves incentive info saved in the firebase.
 * @return A list of all Incentive objects.
 * */
    @GetMapping("/incentives")
    public List<Incentive> getAllIncentives() throws ExecutionException, InterruptedException {
        return incentiveService.getIncentiveInfo();
    }

/**
 * Get specific incentive data associated with a specific user.
 * @param userID refers to the unique identifier of the user.
 * @return A list of Incentive object filtered by the particular user ID.
 * */
    @GetMapping("/incentives/{userID}")
    public List<Incentive> getIncentiveTasks(@PathVariable String userID) throws ExecutionException, InterruptedException {
        return incentiveService.getIncentivesByUser(userID);
    }

/**
 * Get incentives of a specific type associated with a specific user.
 * @param userID The unique identifier of the user.
 * @param type The type of incentive including cool,solar,utility, water,transportation, roof
 * @return A list of Incentive objects filtered by both user ID and incentive type.
 * */
    @GetMapping("/incentives/{userID}/{type}")
    public List<Incentive> getIncentiveTasksByType(@PathVariable String userID, @PathVariable String type) throws ExecutionException, InterruptedException {
        return incentiveService.getIncentivesByTypeAndUser(userID, type);
    }

}

