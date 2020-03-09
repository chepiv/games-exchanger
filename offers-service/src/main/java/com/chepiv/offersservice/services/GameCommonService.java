package com.chepiv.offersservice.services;

import com.chepiv.offersservice.domain.Game;
import com.chepiv.offersservice.domain.GameAccount;
import com.chepiv.offersservice.domain.GameAccountPK;
import com.chepiv.offersservice.repository.GameAccountRepository;
import com.chepiv.offersservice.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by chepiv on 06/03/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@Service
public class GameCommonService {

    private final GameRepository gameRepository;
    private final GameAccountRepository gameAccountRepository;

    @Autowired
    public GameCommonService(GameRepository gameRepository, GameAccountRepository gameAccountRepository) {
        this.gameRepository = gameRepository;
        this.gameAccountRepository = gameAccountRepository;
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    public GameAccount addGameToPlayersLibrary(Long accountId, Long gameId) {
        return gameAccountRepository.save(new GameAccount(new GameAccountPK(gameId, accountId)));
    }

}
