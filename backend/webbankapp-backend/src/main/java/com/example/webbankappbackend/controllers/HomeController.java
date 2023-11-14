package com.example.webbankappbackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "This is a home page.";
    }

    @GetMapping("/account")
    public String account() {
        return "This is an account page.";
    }

    @GetMapping("/auth")
    public String auth() {
        return "This is an auth page.";
    }
}
