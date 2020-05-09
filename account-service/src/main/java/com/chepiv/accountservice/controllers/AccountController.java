package com.chepiv.accountservice.controllers;

import com.chepiv.accountservice.commonservices.AccountCommonService;
import com.chepiv.accountservice.domain.Account;
import com.chepiv.accountservice.domain.AccountPrincipal;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<Account> createAccount(@RequestParam("account") String account, @RequestParam(value = "file",required = false) MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Account accountToPass = objectMapper.readValue(account, Account.class);
        return new ResponseEntity<>(accountCommonService.createAccount(accountToPass, file), HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    public Boolean login(@RequestBody Account account) {
        Account accountDb = accountCommonService.getByLogin(account.getLogin());
        return accountDb.getPassword().equals(accountCommonService.hashPassword(account.getPassword()));
    }

    @GetMapping(value = "/user", produces = "application/json")
    public Map<String, Object> user(OAuth2Authentication user) {
        HashMap<String, Object> userInfo = new HashMap<>();
        Object principal = user.getUserAuthentication().getPrincipal();
        Account account = accountCommonService.getByLogin(((AccountPrincipal) principal).getUsername());

        userInfo.put("user", principal);
        userInfo.put("user-details", account);
        userInfo.put("authorities", AuthorityUtils.authorityListToSet(user.getUserAuthentication().getAuthorities()));
        return userInfo;
    }

    @GetMapping(value = "/user-details", produces = "application/json")
    public ResponseEntity<Account> userDetails(OAuth2Authentication user) {
        AccountPrincipal principal = (AccountPrincipal) user.getUserAuthentication().getPrincipal();
        Account account = accountCommonService.getByLogin(principal.getUsername());
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @GetMapping("byLogin/{login}")
    public ResponseEntity<Account> getUserByLogin(@PathVariable("login") String login) {
        Account account = accountCommonService.getByLogin(login);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }
}
