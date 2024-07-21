package com.sustainability.mvp.controller;

import com.sustainability.mvp.entity.TakeAction;
import com.sustainability.mvp.service.TakeActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/takeactions")
public class TakeActionController {

    @Autowired
    private TakeActionService takeActionService;

    @GetMapping("/users/{userId}")
    public List<TakeAction> getTakeActionsByUserId(@PathVariable String userId) throws ExecutionException, InterruptedException {
        return takeActionService.getTakeActionsByUserId(userId);
    }
}
