package com.chepiv.accountservice.controllers;

import com.chepiv.accountservice.commonservices.AccountCommonService;
import com.chepiv.accountservice.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;
import java.util.List;

/**
 * Created by chepiv on 04/01/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@RestController
@CrossOrigin
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

    @PostMapping
    public Boolean login(@RequestBody Account account) {
        Account accountDb = accountCommonService.getByLogin(account.getLogin());
        return accountDb.getPassword().equals(account.getPassword());
    }

    @RequestMapping("/user")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization")
                .substring("Basic".length()).trim();
        return () ->  new String(Base64.getDecoder()
                .decode(authToken)).split(":")[0];
    }


}
