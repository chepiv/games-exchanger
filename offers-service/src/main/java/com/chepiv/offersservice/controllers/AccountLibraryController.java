package com.chepiv.offersservice.controllers;

import com.chepiv.offersservice.domain.Game;
import com.chepiv.offersservice.domain.GameAccount;
import com.chepiv.offersservice.services.GameCommonService;
import com.chepiv.offersservice.utils.AccountUtils;
import net.minidev.json.JSONObject;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<GameAccount> addGameToAccountsLibraryV1(OAuth2Authentication user,
                                                                  @RequestParam("gameId") Long gameId) {
        return new ResponseEntity<>(gameCommonService.addGameToPlayersLibrary(AccountUtils.extractOauth2AccountId(user), gameId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAccountsLibrary(OAuth2Authentication user) {
        return ResponseEntity.ok(gameCommonService.getAccountLibrary(AccountUtils.extractOauth2AccountId(user)));
    }
}