package com.chepiv.offersservice.controllers;

import com.chepiv.offersservice.domain.Game;
import com.chepiv.offersservice.domain.GameAccount;
import com.chepiv.offersservice.services.GameCommonService;
import com.chepiv.offersservice.utils.AccountUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by chepiv on 06/03/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@RestController
@Slf4j
@RequestMapping("library")
public class AccountLibraryController {

    private final GameCommonService gameCommonService;

    @Autowired
    public AccountLibraryController(GameCommonService gameCommonService) {
        this.gameCommonService = gameCommonService;
    }

    @PostMapping("/{gameId}")
    public ResponseEntity<GameAccount> addGameToAccountsLibraryV1(OAuth2Authentication user,
                                                                  @PathVariable("gameId") Long gameId) {
        log.info("Adding game {}",gameId);
        return new ResponseEntity<>(gameCommonService.addGameToPlayersLibrary(AccountUtils.extractOauth2AccountId(user), gameId), HttpStatus.OK);
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity removeGameFromAccount(OAuth2Authentication user, @PathVariable("gameId") Long gameId) {
        log.info("Deleting game {}", gameId);
        gameCommonService.removeGameFromAccount(AccountUtils.extractOauth2AccountId(user),gameId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAccountsLibrary(OAuth2Authentication user) {
        return ResponseEntity.ok(gameCommonService.getAccountLibrary(AccountUtils.extractOauth2AccountId(user)));
    }

    @GetMapping("/libraryForExchange")
    public ResponseEntity<List<Game>> getGamesAvailableForExchange(OAuth2Authentication user) {
        return ResponseEntity.ok(gameCommonService.getAccountLibraryAvailableForExchange(AccountUtils.extractOauth2AccountId(user)));
    }
}
