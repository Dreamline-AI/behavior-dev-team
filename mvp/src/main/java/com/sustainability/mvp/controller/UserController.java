package com.sustainability.mvp.controller;


import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.sustainability.mvp.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/users/email")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        try {
            User user = userService.getUserByEmail(email);
            return new ResponseEntity<>(user, HttpStatus.OK); // 200 OK with user data
        } catch (UserException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND); // 404 Not Found
        } catch (ExecutionException | InterruptedException e) {
            // Handle Firestore related exceptions, return 500 error for server issues
            return new ResponseEntity<>("Server error. Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}