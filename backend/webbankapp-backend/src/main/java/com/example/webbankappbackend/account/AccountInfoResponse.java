package com.example.webbankappbackend.account;

import java.math.BigDecimal;

import com.example.webbankappbackend.models.Currency;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountInfoResponse {
    private String firstName;
    private String lastName;
    private String bankAccountId;
    private BigDecimal bankAccountBalance;
    private Currency bankAccountCurrency;
}
