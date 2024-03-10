package com.sustainability.mvp.controllers;

import com.sustainability.mvp.security.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustainability.mvp.security.models.SecurityProperties;

@RestController
@RequestMapping("protected")
public class ProtectedController {

    @Autowired
    private SecurityService securityService;

    @GetMapping("data")
    public String getProtectedData() {
        String name = securityService.getUser().getName();
        return name.split("\\s+")[0] + ", you have accessed protected data from spring boot";
    }

}
