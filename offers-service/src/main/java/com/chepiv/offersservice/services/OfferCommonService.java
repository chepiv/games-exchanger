package com.chepiv.offersservice.services;

import com.chepiv.offersservice.client.StorageClient;
import com.chepiv.offersservice.domain.ExchangeOffer;
import com.chepiv.offersservice.domain.Game;
import com.chepiv.offersservice.domain.Offer;
import com.chepiv.offersservice.dto.OfferDto;
import com.chepiv.offersservice.repository.ExchangeOfferRepository;
import com.chepiv.offersservice.repository.GameRepository;
import com.chepiv.offersservice.repository.OfferRepository;
import com.chepiv.offersservice.utils.AccountUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class OfferCommonService {

    private final OfferRepository offerRepository;
    private final GameRepository gameRepository;
    private final ExchangeOfferRepository exchangeOfferRepository;
    private final StorageClient storageClient;
    private final GameCommonService gameCommonService;

    @Autowired
    public OfferCommonService(OfferRepository offerRepository, GameRepository gameRepository, ExchangeOfferRepository exchangeOfferRepository, StorageClient storageClient, GameCommonService gameCommonService) {
        this.offerRepository = offerRepository;
        this.gameRepository = gameRepository;
        this.exchangeOfferRepository = exchangeOfferRepository;
        this.storageClient = storageClient;
        this.gameCommonService = gameCommonService;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAllByActiveIsTrue();
    }

    public Optional<Offer> getOffer(Long id) {
        return offerRepository.findById(id);
    }

    public List<Offer> getUserOffers(OAuth2Authentication user) {
        Long aLong = AccountUtils.extractOauth2AccountId(user);
        return offerRepository.findAllByAccountIdAndActiveIsTrue(aLong);
    }
    
    public Offer addAnOffer(Offer offerDto) {
        if (Objects.isNull(offerDto.getImageUrl())) {
            offerDto.setImageUrl(offerDto.getGames().stream().map(Game::getCoverUrl).findFirst().orElse(""));
        } else {
//            storageClient.uploadFile() TODO: create an offer as account with file
        }
        return offerRepository.save(offerDto);
    }

    public ExchangeOffer addExchangeOffer(ExchangeOffer exchangeOffer) {
        exchangeOffer.setDate(new Date(System.currentTimeMillis()));
        return exchangeOfferRepository.save(exchangeOffer);
    }

    public Optional<ExchangeOffer> getExchangeOffer(Long id) {
        return exchangeOfferRepository.findById(id);
    }

    public List<ExchangeOffer> getReceivedOffers(Long accountId) {
        return exchangeOfferRepository.findAllReceivedOffers(accountId);
    }

    public boolean acceptOffer(Long exchangeOfferId) {
        Optional<ExchangeOffer> exchangeOffer = exchangeOfferRepository.findById(exchangeOfferId);
        if (exchangeOffer.isPresent()) {
            ExchangeOffer offer = exchangeOffer.get();
            Long oneWhoOffersGamesToExchange = offer.getAccountId();
            Long whoOwnsGames = offer.getSourceOffer().getAccountId();
            List<Game> offeredGames = offer.getOfferedGames();
            List<Game> gamesFromSourceOffer = offer.getSourceOffer().getGames();
            exchangeGamesBetweenAccounts(oneWhoOffersGamesToExchange, whoOwnsGames, offeredGames, gamesFromSourceOffer);
            removeSourceOffer(offer.getSourceOffer().getId());
            offer.setAccepted(true);
            exchangeOfferRepository.save(offer);
            return true;
        }
        return false;
    }

    private void exchangeGamesBetweenAccounts(Long firstAccountId, Long secondAccountId, List<Game> firstAccountGames, List<Game> secondAccountGames) {
        removeGamesFromAccount(firstAccountGames, firstAccountId);
        removeGamesFromAccount(secondAccountGames, secondAccountId);
        addGamesToAccount(secondAccountGames, firstAccountId);
        addGamesToAccount(firstAccountGames, secondAccountId);
    }

    public void removeSourceOffer(Long sourceOfferId) {
        Optional<Offer> sourceOffer = offerRepository.findById(sourceOfferId);
        if (sourceOffer.isPresent()) {
            Offer offer = sourceOffer.get();
            offer.setActive(false);
        }
    }

    private void addGamesToAccount(List<Game> games, Long accountId) {
        games.forEach(game -> gameCommonService.addGameToPlayersLibrary(accountId, game.getId()));
    }

    private void removeGamesFromAccount(List<Game> games, Long accountId) {
        games.forEach(game -> gameCommonService.removeGameFromAccount(accountId, game.getId()));
    }


    private Offer map(OfferDto offerDto) {
        Offer offer = new Offer();
        offer.setAccountId(offerDto.getAccountId());
        offer.setDescription(offerDto.getDescription());
        offer.setImageUrl(offerDto.getImageUrl());
        offer.setGames(gameRepository.findAllById(offerDto.getGames()));
        return offer;
    }

}
