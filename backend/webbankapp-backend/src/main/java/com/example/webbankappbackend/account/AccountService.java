package com.example.webbankappbackend.account;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.example.webbankappbackend.models.BankAccount;
import com.example.webbankappbackend.models.Currency;
import com.example.webbankappbackend.models.User;
import com.example.webbankappbackend.repositories.BankAccountRepository;
import com.example.webbankappbackend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;

    public AccountInfoResponse getAccountInfo(Principal principal) {
        User user = getUserInfo(principal);
        BankAccount bankAccount = getBankAccountInfo(user.getId());

        // if user doesn't have a bank account then return only user's info
        if (bankAccount == null) {
            return AccountInfoResponse.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .build();
        }

        return AccountInfoResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .bankAccountId(bankAccount.getId())
                .bankAccountBalance(bankAccount.getBalance())
                .bankAccountCurrency(bankAccount.getCurrency())
                .build();
    }

    private User getUserInfo(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow();

        return user;
    }

    private BankAccount getBankAccountInfo(Long userId) {
        if (!bankAccountRepository.findByUserId(userId).isPresent()) {
            return null;
        }

        BankAccount bankAccount = bankAccountRepository.findByUserId(userId)
                .orElseThrow();

        return bankAccount;
    }

    public String createAccount(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        // check if user already has a bank account
        if (bankAccountRepository.findByUserId(user.getId()).isPresent()) {
            return "User already has a bank account.";
        }

        // generate unique id for new bank account
        String bankAccountId;

        do {
            bankAccountId = generateBankAccountId();
        } while (bankAccountRepository.findById(bankAccountId).isPresent());

        BankAccount bankAccount = BankAccount.builder()
                .id(bankAccountId)
                .currency(Currency.PLN)
                .balance(new BigDecimal(0))
                .creationDate(LocalDate.now().toString())
                .user(user)
                .build();

        bankAccountRepository.save(bankAccount);

        return "Bank account successfully created";
    }

    // generate 26 digit random number.
    private String generateBankAccountId() {
        StringBuilder str = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 26; i++) {
            str.append(random.nextInt(10));
        }

        return str.toString();
    }

}
