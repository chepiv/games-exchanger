package com.chepiv.accountservice.repository;

import com.chepiv.accountservice.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Created by chepiv on 04/01/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Account findAccountByLogin(String login);
}
