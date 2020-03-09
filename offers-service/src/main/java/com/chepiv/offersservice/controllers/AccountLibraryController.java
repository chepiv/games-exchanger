package com.chepiv.offersservice.controllers;

import com.chepiv.offersservice.domain.GameAccount;
import com.chepiv.offersservice.services.GameCommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by chepiv on 06/03/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@RestController
@RequestMapping("library")
public class AccountLibraryController {

    private final GameCommonService gameCommonService;

    @Autowired
    public AccountLibraryController(GameCommonService gameCommonService) {
        this.gameCommonService = gameCommonService;
    }

    @PostMapping
    public ResponseEntity<GameAccount> addGameToAccountsLibrary(@RequestParam("accountId") Long accountId,
                                                                @RequestParam("gameId") Long gameId) {
        return new ResponseEntity<>(gameCommonService.addGameToPlayersLibrary(accountId, gameId), HttpStatus.OK);
    }
}
