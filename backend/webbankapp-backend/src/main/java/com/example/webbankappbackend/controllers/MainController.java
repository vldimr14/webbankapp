package com.example.webbankappbackend.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.webbankappbackend.models.User;
import com.example.webbankappbackend.repositories.UserRepository;

@RequestMapping("/api")
@RestController
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("This is a home page.");
    }

    @GetMapping("/account")
    public ResponseEntity<User> account(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }
}
