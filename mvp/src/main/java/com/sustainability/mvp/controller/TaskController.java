//package com.sustainability.mvp.controller;
//
//import com.sustainability.mvp.entity.Task;
//import com.sustainability.mvp.entity.User;
//import com.sustainability.mvp.service.TaskService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.concurrent.ExecutionException;
//
//
//@RestController
//@RequestMapping("/api")
//public class TaskController {
//
//    @Autowired
//    private TaskService taskService;
//
//    @GetMapping("/tasks")
//    public List<Task> getAllTasks() throws ExecutionException, InterruptedException {
//        return taskService.getTaskINFO();
//    }
//
//    @GetMapping("/tasks/{userID}")
//    public List<Task> getUserTasks(@PathVariable String userID) throws ExecutionException, InterruptedException {
//        return taskService.getUnfinishedTasksByUser(userID);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<List<Task>> loginAndGetUnfinishedTasks(@RequestBody User userCredentials) {
//        String userID = userCredentials.getUserID();
//        String password = userCredentials.getPassword();
//
//        boolean isAuthenticated = isValidCredentials(userID, password);
//
//        if (isAuthenticated) {
//            try {
//                List<Task> unfinishedTasks = taskService.getUnfinishedTasksByUser(userID);
//                return ResponseEntity.ok().body(unfinishedTasks);
//            } catch (ExecutionException | InterruptedException e) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//            }
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }
//
//    private boolean isValidCredentials(String userID, String password) {
//        return "admin".equals(userID) && "password".equals(password);
//    }
//}
