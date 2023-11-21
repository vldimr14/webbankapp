package com.example.webbankappbackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.webbankappbackend.models.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {

    Optional<Transaction> findById(String id);

    Optional<Transaction> findBySenderId(String id);

    Optional<Transaction> findByRecipientId(String id);
}
