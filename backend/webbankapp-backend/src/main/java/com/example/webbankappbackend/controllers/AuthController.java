package com.example.webbankappbackend.controllers;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.webbankappbackend.models.User;
import com.example.webbankappbackend.repositories.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    public record NewUserRequest(
            String email,
            String password,
            String firstName,
            String lastName,
            String passportId,
            String birthDate) {

    }

    public record LoginRequest(
            String username,
            String password) {
    }

    @GetMapping
    public ResponseEntity<String> auth() {
        return ResponseEntity.ok("This is an auth page.");
    }

    @PostMapping("/register")
    private ResponseEntity<User> register(@RequestBody NewUserRequest newUserRequest) throws URISyntaxException {
        if (userRepository.findByEmail(newUserRequest.email) != null) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(302));
        }

        User user = new User(
                newUserRequest.email(),
                new BCryptPasswordEncoder().encode(newUserRequest.password()),
                newUserRequest.firstName(),
                newUserRequest.lastName(),
                newUserRequest.passportId(),
                newUserRequest.birthDate());

        User savedUser = userRepository.save(user);
        return ResponseEntity.created(new URI("/api/account/" + savedUser.getId())).body(savedUser);
    }
}
