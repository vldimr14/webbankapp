package com.example.webbankappbackend.account;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.security.Principal;
import java.time.LocalDate;
import java.util.UUID;

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

    public NewBankAccountResponse createAccount(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        if (bankAccountRepository.findByUserId(user.getId()).isPresent()) {
            return NewBankAccountResponse.builder()
                    .message("User already has a bank account.")
                    .build();
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

        return NewBankAccountResponse.builder()
                .message("Bank account successfully created")
                .build();
    }

    // TODO generate unique random 26 digit number (can be few numbers) and convert
    // it to string
    private String generateBankAccountId() {
        String id = String.format("%026d", new BigInteger(
                UUID.randomUUID()
                        .toString()
                        .replace("-", "")),
                16);

        return id;
    }

}
