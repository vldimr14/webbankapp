package com.example.webbankappbackend.controllers;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.webbankappbackend.account.AccountInfoResponse;
import com.example.webbankappbackend.account.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class AccountController {

    private final AccountService service;

    @GetMapping
    public ResponseEntity<AccountInfoResponse> profile(Principal principal) {
        return ResponseEntity.ok(service.getAccountInfo(principal));
    }

    @GetMapping("/create_account")
    public ResponseEntity<String> createAccount(Principal principal) {
        return ResponseEntity.ok(service.createAccount(principal));
    }
}
