package com.sustainability.mvp.controller;


import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.sustainability.mvp.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustainability.mvp.entity.User;
import com.sustainability.mvp.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:19006")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public String saveUser(@RequestBody User user) throws ExecutionException, InterruptedException {
        return userService.saveUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() throws ExecutionException, InterruptedException{
        return userService.getUserDetails();
    }

    @GetMapping("/users/{userID}")
    public User getUserbyUserID(@PathVariable String userID) throws ExecutionException, InterruptedException{
        return userService.getUserByUserID(userID);
    }

    @GetMapping("/voltCoins/{userID}")
    public Integer getVoltCoins(@PathVariable String userID) throws ExecutionException, InterruptedException {
        return userService.getVoltCoins(userID);
    }

    @PutMapping("/voltCoins/{userID}")
    public Integer saveVoltCoins(@PathVariable String userID, @RequestBody Integer voltCoins) throws ExecutionException, InterruptedException {
        System.out.println("Received voltCoins for user " + userID + ": " + voltCoins); // Log to verify received data
        return userService.updateVoltCoins(userID, voltCoins);

    }

    @PutMapping("/users/{userID}")
    public String updateUserByUserID(@PathVariable String userID, @RequestBody Map<String, Object> updates) throws ExecutionException, InterruptedException{
        return userService.updateUserByUserID(userID, updates);
    }

    @DeleteMapping("/users/{userID}")
    public String deleteUserByUserID(@PathVariable String userID) throws ExecutionException, InterruptedException {
        return userService.deleteUserByUserID(userID);
    }

}