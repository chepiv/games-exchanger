package com.chepiv.accountservice.commonservices;

import com.chepiv.accountservice.domain.Account;
import com.chepiv.accountservice.domain.AccountPrincipal;
import com.chepiv.accountservice.repository.AccountRepository;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Created by chepiv on 05/01/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@Service
public class AccountCommonService  implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountCommonService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAll() {
        return accountRepository.findAll();
    }

    public Account createAccount(Account account) {
        account.setPassword(hashPassword(account.getPassword()));
        return accountRepository.save(account);
    }

    public Account getByLogin(String login) {
        return accountRepository.findAccountByLogin(login);
    }

    public String hashPassword(String password){
        return Hashing.sha512().hashString(password, StandardCharsets.UTF_8).toString();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Account login = getByLogin(s);
        return new AccountPrincipal(login);
    }
}
