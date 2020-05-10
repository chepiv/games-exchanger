package com.chepiv.offersservice.services;

import com.chepiv.offersservice.domain.Game;
import com.chepiv.offersservice.domain.GameAccount;
import com.chepiv.offersservice.domain.GameAccountPK;
import com.chepiv.offersservice.domain.Offer;
import com.chepiv.offersservice.repository.GameAccountRepository;
import com.chepiv.offersservice.repository.GameRepository;
import com.chepiv.offersservice.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
    private final OfferRepository offerRepository;

    @Autowired
    public GameCommonService(GameRepository gameRepository, GameAccountRepository gameAccountRepository, OfferRepository offerRepository) {
        this.gameRepository = gameRepository;
        this.gameAccountRepository = gameAccountRepository;
        this.offerRepository = offerRepository;
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

    public List<Game> getAccountLibraryAvailableForExchange(Long accountId) {
        List<GameAccount> gameAccountList = gameAccountRepository.findByIdAccountId(accountId);
        return gameAccountList.stream()
                .map(gameAccount -> gameRepository.findById(gameAccount.getId().getGameId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .filter(game -> !isGameAlreadyInOffer(game.getId(), accountId))
                .collect(Collectors.toList());
    }

    private boolean isGameAlreadyInOffer(Long gameId, Long accountId) {
        List<Offer> allByAccountIdAndActiveIsTrue = offerRepository.findAllByAccountIdAndActiveIsTrue(accountId);
        Set<Long> gamesFromUserOffers = allByAccountIdAndActiveIsTrue.stream()
                .map(Offer::getGames)
                .flatMap(Collection::stream)
                .map(Game::getId)
                .collect(Collectors.toSet());

        return gamesFromUserOffers.contains(gameId);
    }


}
