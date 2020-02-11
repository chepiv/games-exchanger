package com.chepiv.accountservice.controllers;

import com.chepiv.accountservice.commonservices.AccountCommonService;
import com.chepiv.accountservice.domain.Account;
import com.chepiv.accountservice.domain.AccountPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/register")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return new ResponseEntity<>(accountCommonService.createAccount(account), HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    public Boolean login(@RequestBody Account account) {
        Account accountDb = accountCommonService.getByLogin(account.getLogin());
        return accountDb.getPassword().equals(accountCommonService.hashPassword(account.getPassword()));
    }

    @GetMapping(value = "/user",produces = "application/json")
    public Map<String,Object> user(OAuth2Authentication user) {
        HashMap<String, Object> userInfo = new HashMap<>();
        userInfo.put("user", user.getUserAuthentication().getPrincipal());
        userInfo.put("authorities", AuthorityUtils.authorityListToSet(user.getUserAuthentication().getAuthorities()));
        return userInfo;
    }

    @GetMapping(value = "/user-details",produces = "application/json")
    public Account userDetails(OAuth2Authentication user) {
        AccountPrincipal principal = (AccountPrincipal) user.getUserAuthentication().getPrincipal();
        return accountCommonService.getByLogin(principal.getUsername());
    }

    @GetMapping("/{login}")
    public ResponseEntity<Account> getUserByLogin(@PathVariable("login") String login) {
        Account account = accountCommonService.getByLogin(login);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }
}
