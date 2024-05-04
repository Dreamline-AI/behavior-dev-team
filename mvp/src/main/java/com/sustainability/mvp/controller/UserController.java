package com.sustainability.mvp.controller;

import com.sustainability.mvp.entity.Product;
import com.sustainability.mvp.entity.User;
import com.sustainability.mvp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
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

    @PutMapping("/users/{userID}")
    public String updateUserByUserID(@PathVariable String userID, @RequestBody Map<String, Object> updates) throws ExecutionException, InterruptedException{
        return userService.updateUserByUserID(userID, updates);
    }

    @DeleteMapping("/users/{userID}")
    public String updateUserByUserID(@PathVariable String userID) throws ExecutionException, InterruptedException {
        return userService.updateUserByUserID(userID);
    }

}