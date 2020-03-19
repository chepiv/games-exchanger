package com.chepiv.offersservice.services;

import com.chepiv.offersservice.domain.Game;
import com.chepiv.offersservice.domain.GameAccount;
import com.chepiv.offersservice.domain.GameAccountPK;
import com.chepiv.offersservice.repository.GameAccountRepository;
import com.chepiv.offersservice.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }

    public GameAccount addGameToPlayersLibrary(Long accountId, Long gameId) { // TODO: 11.03.2020 add from account side also
        Optional<Game> game = gameRepository.findById(gameId);
        GameAccount gameAccount = new GameAccount(new GameAccountPK(gameId, accountId));
        game.ifPresent(gameAccount::setGame);
        return gameAccountRepository.save(gameAccount);
    }

    public void removeGameFromAccount(Long accountId, Long gameId) {
        gameAccountRepository.deleteById(new GameAccountPK(gameId,accountId));
    }

    public List<Game> getAccountLibrary(Long accountId) {
        List<GameAccount> gameAccountList = gameAccountRepository.findByIdAccountId(accountId);
        return gameAccountList.stream()
                .map(gameAccount -> gameRepository.findById(gameAccount.getId().getGameId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

}
