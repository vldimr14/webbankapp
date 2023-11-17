package com.example.webbankappbackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.webbankappbackend.models.BankAccount;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
    Optional<BankAccount> findByUserId(Long userId);

    Optional<BankAccount> findById(String id);
}
