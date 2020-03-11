package com.chepiv.offersservice.controllers;

import com.chepiv.offersservice.domain.Game;
import com.chepiv.offersservice.services.GameCommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Created by chepiv on 06/03/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@RestController
@CrossOrigin
@RequestMapping("games")
public class GameController {

    private final GameCommonService gameCommonService;

    @Autowired
    public GameController(GameCommonService gameCommonService) {
        this.gameCommonService = gameCommonService;
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAll(){
        return new ResponseEntity<>(gameCommonService.getAllGames(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable("id")Long id) {
        Optional<Game> gameById = gameCommonService.getGameById(id);
        return gameById.map(game -> new ResponseEntity<>(game, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Game> saveGame(@RequestBody Game game) {
        return new ResponseEntity<>(gameCommonService.saveGame(game),HttpStatus.OK);
    }





}
