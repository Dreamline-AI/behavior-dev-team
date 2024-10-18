package com.sustainability.mvp.controller;


import com.sustainability.mvp.entity.Profile;
import com.sustainability.mvp.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sustainability.mvp.entity.User;

import java.util.List;
import java.util.concurrent.ExecutionException;
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

/**
 * This function saves a profile object in the database.
 * @param profile Profile object to be saved.
 * @return The update time as a string after saving the profile.
 * */
    @PostMapping("/Profile")
    public String saveTrivia(@RequestBody Profile profile) throws ExecutionException, InterruptedException {

        return profileService.saveProfile(profile);
    }

    /**
     * This function retrieves a profile object by specific user ID.
     * @param userID The user ID associated with the profile.
     * @return Profile object corresponding to the userID.
 * */
    @GetMapping("/Profile/{userID}")
    public Profile getTrivia(@PathVariable String userID) throws ExecutionException, InterruptedException {
        return profileService.getProfileDetailsByID(userID);
    }

/**
 * This function retrieves all profile objects from the firebase.
 * @return A list of all profile objects.
 * */
    @GetMapping("/Profile")
    public List<Profile> getAllProducts() throws ExecutionException, InterruptedException {
        return profileService.getProfileDetails();
    }
    @PutMapping("/Profile/{userID}")
    public String updateProfile(@PathVariable String userID, @RequestBody User profile) throws ExecutionException, InterruptedException {
        return profileService.updateProfile(userID, profile);
    }
}
