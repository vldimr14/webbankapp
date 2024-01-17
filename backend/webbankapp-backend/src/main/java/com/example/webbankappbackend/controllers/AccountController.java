package com.example.webbankappbackend.controllers;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.webbankappbackend.account.AccountInfoResponse;
import com.example.webbankappbackend.account.AccountService;
import com.example.webbankappbackend.account.TransferRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest transferRequest,
            Principal principal) {
        return ResponseEntity.ok(service.transfer(transferRequest, principal));
    }

    @GetMapping("/transactions")
    public ResponseEntity<String> getTransaction(@RequestParam String id) {
        return ResponseEntity.ok(service.getTransaction(id));
    }

    @GetMapping("/all_transactions")
    public ResponseEntity<String> getTransactions(Principal principal) {
        return ResponseEntity.ok(service.getTransactions(principal));
    }
}
