package com.chepiv.offersservice.services;

import com.chepiv.offersservice.client.AccountClient;
import com.chepiv.offersservice.client.EmailClient;
import com.chepiv.offersservice.client.StorageClient;
import com.chepiv.offersservice.client.reponsedata.Account;
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
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OfferCommonService {

    private final OfferRepository offerRepository;
    private final GameRepository gameRepository;
    private final ExchangeOfferRepository exchangeOfferRepository;
    private final StorageClient storageClient;
    private final EmailClient emailClient;
    private final AccountClient accountClient;
    private final GameCommonService gameCommonService;

    @Autowired
    public OfferCommonService(OfferRepository offerRepository, GameRepository gameRepository, ExchangeOfferRepository exchangeOfferRepository, StorageClient storageClient, EmailClient emailClient, AccountClient accountClient, GameCommonService gameCommonService) {
        this.offerRepository = offerRepository;
        this.gameRepository = gameRepository;
        this.exchangeOfferRepository = exchangeOfferRepository;
        this.storageClient = storageClient;
        this.emailClient = emailClient;
        this.accountClient = accountClient;
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

    public Offer addAnOffer(Offer offerDto) throws IllegalArgumentException {
        if (Objects.isNull(offerDto.getImageUrl())) {
            offerDto.setImageUrl(offerDto.getGames().stream().map(Game::getCoverUrl).findFirst().orElse(""));
        } else {
//            storageClient.uploadFile() TODO: create an offer as account with file
        }
        verifyIfGamesAlreadyInOffer(offerDto);
        return offerRepository.save(offerDto);
    }

    private void verifyIfGamesAlreadyInOffer(Offer offerDto) {
        List<Long> gamesIds = offerDto.getGames().stream().map(Game::getId).collect(Collectors.toList());
        List<Offer> allByAccountIdAndActiveIsTrue = offerRepository.findAllByAccountIdAndActiveIsTrue(offerDto.getAccountId());
        Set<Long> gamesFromUserOffers = allByAccountIdAndActiveIsTrue.stream()
                .map(Offer::getGames)
                .flatMap(Collection::stream)
                .map(Game::getId)
                .collect(Collectors.toSet());
        if (!Collections.disjoint(gamesIds, gamesFromUserOffers)) {
            throw new IllegalArgumentException("Can't add games that already in other offers");
        }
    }

    public ExchangeOffer addExchangeOffer(ExchangeOffer exchangeOffer, OAuth2Authentication user) {

        exchangeOffer.setDate(new Date(System.currentTimeMillis()));
        ExchangeOffer save = exchangeOfferRepository.save(exchangeOffer);

        notifyOwnerOfOfferByMail(exchangeOffer, user);

        return save;
    }

    private void notifyOwnerOfOfferByMail(ExchangeOffer exchangeOffer, OAuth2Authentication user) {
        try {
            final OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) user.getDetails();
            //token
            String accessToken = details.getTokenValue();
            Account ownerOfOffer = accountClient.getUserById(exchangeOffer.getSourceOffer().getAccountId(), "Bearer " + accessToken);
            emailClient.sendEmail(ownerOfOffer.getEmail(), "You have received an offer", "You have received an offer for your offer: " + exchangeOffer.getSourceOffer().getTitle());
        } catch (Exception e) {
            log.warn("Unable to send email", e);
        }
    }

    private void notifyThatExchangeOfferAccepted(ExchangeOffer exchangeOffer, OAuth2Authentication user) {
        try {
            final OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) user.getDetails();
            //token
            String accessToken = details.getTokenValue();
            Account ownerOfOffer = accountClient.getUserById(exchangeOffer.getAccountId(), "Bearer " + accessToken);
            emailClient.sendEmail(ownerOfOffer.getEmail(), "Your exchange offer ACCEPTED",
                    "Your exchange offer for offer: " + exchangeOffer.getSourceOffer().getTitle() + " has been accepted. Games from offers have been exchanged");
        } catch (Exception e) {
            log.warn("Unable to send email", e);
        }
    }

    private void notifyThatExchangeOfferDeclined(ExchangeOffer exchangeOffer, OAuth2Authentication user) {
        try {
            final OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) user.getDetails();
            //token
            String accessToken = details.getTokenValue();
            Account ownerOfOffer = accountClient.getUserById(exchangeOffer.getAccountId(), "Bearer " + accessToken);
            emailClient.sendEmail(ownerOfOffer.getEmail(), "Your exchange offer DECLINED",
                    "Your exchange offer for offer: " + exchangeOffer.getSourceOffer().getTitle() + " has been declined.");
        } catch (Exception e) {
            log.warn("Unable to send email", e);
        }
    }

    public Optional<ExchangeOffer> getExchangeOffer(Long id) {
        return exchangeOfferRepository.findById(id);
    }

    public List<ExchangeOffer> getReceivedOffers(Long accountId) {
        return exchangeOfferRepository.findAllReceivedOffers(accountId);
    }

    public List<ExchangeOffer> getSentOffers(Long accountId) {
        return exchangeOfferRepository.findAllSentOffers(accountId);
    }

    public boolean acceptOffer(Long exchangeOfferId, OAuth2Authentication user) {
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
            notifyThatExchangeOfferAccepted(offer, user);
            return true;
        }
        return false;
    }

    public boolean declineExchangeOfferOffer(Long exchageOfferId, OAuth2Authentication user) {
        Optional<ExchangeOffer> exchangeOffer = exchangeOfferRepository.findById(exchageOfferId);
        if (exchangeOffer.isPresent()) {
            ExchangeOffer offer = exchangeOffer.get();
            offer.setAccepted(false);
            exchangeOfferRepository.save(offer);
            notifyThatExchangeOfferDeclined(offer, user);
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
            offerRepository.save(offer);
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
