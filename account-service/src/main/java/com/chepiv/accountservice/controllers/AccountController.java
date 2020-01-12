package com.chepiv.accountservice.controllers;

import com.chepiv.accountservice.commonservices.AccountCommonService;
import com.chepiv.accountservice.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by chepiv on 04/01/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@RestController
@RequestMapping("accounts")
public class AccountController {

    private final AccountCommonService accountCommonService;

    @Autowired
    public AccountController(AccountCommonService accountCommonService) {
        this.accountCommonService = accountCommonService;
    }


    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountCommonService.getAll();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return new ResponseEntity<>(accountCommonService.createAccount(account), HttpStatus.OK);
    }
}
