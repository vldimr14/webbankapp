package com.example.webbankappbackend.models;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    private String id;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private BigDecimal amount;
    @Column(nullable = false)
    private Currency currency;
    @Column(nullable = false)
    private TransferType type;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private BankAccount sender;

    @ManyToOne
    @JoinColumn(name = "recipient_id", nullable = false)
    private BankAccount recipient;

    @Column(nullable = false)
    private String date;
}
