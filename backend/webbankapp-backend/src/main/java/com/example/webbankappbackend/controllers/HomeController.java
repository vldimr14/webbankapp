package com.example.webbankappbackend.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.webbankappbackend.models.User;
import com.example.webbankappbackend.repositories.UserRepository;

@RestController
public class HomeController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String home() {
        return "This is a home page.";
    }

    @GetMapping("/account")
    public String account(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return "Hello, " + user.getFirstName();
    }

    @GetMapping("/auth")
    public String auth() {
        return "This is an auth page.";
    }
}
