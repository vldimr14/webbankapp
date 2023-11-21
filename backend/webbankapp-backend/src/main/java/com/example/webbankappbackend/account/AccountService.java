package com.example.webbankappbackend.account;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.webbankappbackend.models.BankAccount;
import com.example.webbankappbackend.models.Currency;
import com.example.webbankappbackend.models.Transaction;
import com.example.webbankappbackend.models.TransferType;
import com.example.webbankappbackend.models.User;
import com.example.webbankappbackend.repositories.BankAccountRepository;
import com.example.webbankappbackend.repositories.TransactionRepository;
import com.example.webbankappbackend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;

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
        User user = getUserInfo(principal);

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
                .balance(new BigDecimal(500))
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

    // Transfer system

    public String transfer(TransferRequest transferRequest, Principal principal) {

        User user = getUserInfo(principal);

        BankAccount senderBankAccount = getBankAccountInfo(user.getId());
        BankAccount recipientBankAccount = bankAccountRepository.findById(
                transferRequest.getRecipientAccountId()).orElse(null);

        if (senderBankAccount == null) {
            return "User does not have a bank account.";
        }

        if (transferRequest.getRecipientAccountId().equals(senderBankAccount.getId())) {
            return "Recipient account is the same as sender's";
        }

        if (recipientBankAccount == null) {
            return "Recipient account does not exist.";
        }

        if (senderBankAccount.getBalance().compareTo(transferRequest.getAmount()) < 0) {
            return "User does not have sufficient funds.";
        }

        // update sender and recipient accounts.
        senderBankAccount.setBalance(senderBankAccount.getBalance()
                .subtract(transferRequest.getAmount()));

        recipientBankAccount.setBalance(recipientBankAccount.getBalance()
                .add(transferRequest.getAmount()));

        // generate transaction id;
        String transactionId;
        do {
            transactionId = generateTransactionId();
        } while (transactionRepository.findById(transactionId).isPresent());

        Transaction transaction = Transaction.builder()
                .id(transactionId)
                .amount(transferRequest.getAmount())
                .description(transferRequest.getDescription())
                .currency(senderBankAccount.getCurrency())
                .type(TransferType.TRANSFER)
                .sender(senderBankAccount)
                .recipient(recipientBankAccount)
                .date(LocalDate.now().toString())
                .build();

        transactionRepository.save(transaction);

        return "Transaction successful.";
    }

    public String generateTransactionId() {
        UUID randomUUID = UUID.randomUUID();

        return randomUUID.toString().replace("_", "");
    }

}
