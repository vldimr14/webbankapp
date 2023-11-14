package com.example.webbankappbackend.controllers;

import java.net.URI;
import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.webbankappbackend.models.User;
import com.example.webbankappbackend.repositories.UserRepository;

@RestController
@RequestMapping("/auth/register")
public class RegisterController {

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

    @PostMapping
    private void register(@RequestBody NewUserRequest newUserRequest) {
        User user = new User(
                newUserRequest.email(),
                newUserRequest.password(),
                newUserRequest.firstName(),
                newUserRequest.lastName(),
                newUserRequest.passportId(),
                newUserRequest.birthDate());

        userRepository.save(user);
    }
}
