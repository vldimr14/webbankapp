package com.example.webbankappbackend.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.webbankappbackend.models.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {

    Optional<Transaction> findById(String id);

    List<Transaction> findAllBySenderId(String id);

    List<Transaction> findAllByRecipientId(String id);

    ArrayList<Transaction> findAllBySenderIdOrRecipientIdOrderByDateDesc(String senderId, String recipientId);
}
