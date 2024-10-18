package com.sustainability.mvp.controller;


import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
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
@CrossOrigin("http://localhost:19006/")
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

    @PostMapping("/check-user")
    public boolean checkUserExists(@RequestBody String email) throws ExecutionException, InterruptedException {
        return userService.userExists(email);
    }
    @GetMapping("/user-info/{email}")
    public Map<String, Object> getUserBasicInfoByEmail(@PathVariable String email) throws ExecutionException, InterruptedException {
        return userService.getUserBasicInfoByEmail(email);
    }

    @GetMapping("/users/{userID}")
    public User getUserbyUserID(@PathVariable String userID) throws ExecutionException, InterruptedException{
        return userService.getUserByUserID(userID);
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