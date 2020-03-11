package com.chepiv.offersservice.repository;

import com.chepiv.offersservice.domain.GameAccount;
import com.chepiv.offersservice.domain.GameAccountPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by chepiv on 06/03/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
public interface GameAccountRepository extends JpaRepository<GameAccount, GameAccountPK> {
    List<GameAccount> findByIdAccountId(Long accountId);
}
